import difference from 'lodash/difference';
import isArray from 'lodash/isArray';
import isPlainObject from 'lodash/isPlainObject';
import memoize from 'lodash/memoize';
import warning from 'warning';
import {
  normalizeEntity,
  includes
} from './utils';

const attrDescriptor = (fieldName) => ({
  get () {
    return this.finalUserProps[fieldName];
  },

  set (value) {
    return this.set(fieldName, value);
  },

  enumerable: true,
  configurable: true
});

const fieldToFkModelObjDescriptor = (fieldName, toModelName) => ({
  get () {
    const session = this.getClass().session;
    const toModel = session[toModelName];
    const toId = this.finalUserProps[fieldName];

    if (typeof toId !== 'undefined' && toId !== null) {
      return toModel.withId(toId);
    }
  },
  set (value) {
    const session = this.getClass().session;
    const toModel = session[toModelName];

    let toId;
    if (value instanceof toModel) {
      toId = value.getId();
    } else {
      toId = value;
    }

    this.update({ [fieldName]: toId });
  }
});

// Reverse side of a Foreign Key: returns many objects.
const fkModelObjToFieldDescriptor = (declaredFieldName, fromModelName) => ({
  get () {
    const session = this.getClass().session;
    const fromModel = session[fromModelName];
    const thisId = this.getId();
    // session.Host.withId(hostId).replies 会执行到这些，然后接下来执行 .filter，.filter 会返回 QuerySet，
    // 所以才能够继续执行 .replies.toRefArray()，但是默认情况下我们并不需要执行 .toRefArray()，因为大多数情况
    // 本身就希望得到的是 refArray，而不是 QuerySet，所以这里改成默认返回 refArray，如果需要返回 QuerySet，
    // 则需要用显式的方式，即 model.getQuerySet()
    // 原本代码为：return fromModel.filter({ [declaredFieldName]: thisId });
    // 修改后代码为：
    return fromModel.filter({ [declaredFieldName]: thisId }).toRefArray();
  },
  set () {
    throw new Error('Can\'t mutate a reverse many-to-one relation.');
  }
});

const oneModelObjToFieldDescriptor = (declaredFieldName, fromModelName) => ({
  get () {
    const session = this.getClass().session;
    const fromModel = session[fromModelName];
    const thisId = this.getId();

    return fromModel.get({ [declaredFieldName]: thisId });
  },
  
  set () {
    throw new Error('Can\'t mutate a reverse one-to-one relation.');
  }
});

const definedManyToManyDescriptorMap = {};

// reverse 为 false 的时候代表 forward，为 true 的时候代表 backward
const manyToManyDescriptor = memoize((
  fromModelName, // Article
  toModelName, // User
  throughModelName, // Article-User
  throughFields, // { from: 'articleId', to: 'userId' }
  fieldName,
  reverse
) => ({
  get () {
    let {[fromModelName]: fromModel, [toModelName]: toModel, [throughModelName]: throughModel} = this.getClass().session;
    let fromFieldName = throughFields.from; // 如 articleId
    let toFieldName = throughFields.to; // 如 'userId'
    const thisId = this.getId(); // userProps 里 id 的值
    const lookupObj = {[fromFieldName]: thisId};
    
    if (reverse) {
      lookupObj[toFieldName] = thisId;
      const temp = fromFieldName;
      fromFieldName = toFieldName;
      toFieldName = temp;
      
      const temp2 = fromModel;
      fromModel = toModel;
      fromModelName = toModel.modelName;
      toModel = temp2;
      toModelName = temp2.modelName;
    }

    // TODO 感觉不应该定义成 descriptor 的 get，直接在原型上赋值 author 的时候赋值 id 而不是对象不就好了吗？
    // 当像 article.author 这样访问的时候
    // 需要在 Article-User 这个中间表中找到 articleId 等于 article.id 的那一行或者多行，比如 article.id = 3
    const throughQs = throughModel.filter(lookupObj);
    // 在 Article-User 中找到 article.id = 3 的 userId 的集合
    // 如 ['33', '232'] 就代表 articleId 为 3 的这篇文章的作者是 userId 为 '33' 和 '232' 的这两个人
    const toIds = throughQs.toRefArray().map(obj => obj[fromFieldName]);
    // 找到 User Model 里面对应这些 id 的行的 Queryset
    // 然后给这个 QuerySet 添加对应的 add，remove 方法，所以通过 article.author 这样查询后可以直接调用 remove
    const qs = toModel.filter(attrs => includes(toIds, attrs[toModel.idAttribute]));

    // 给 article.author 添加作者
    qs.add = function add (addedArr) {
      if (isPlainObject(addedArr)) {
        addedArr = [addedArr]
      } else if (!isArray(addedArr)) {
        throw Error(`Added value must be an object/array, but passed in ${addedArr}`);
      }
      
      const idsToAdd = addedArr.map(v => v[toModel.idAttribute]);
      // 在 articleId = 3 的情况下选出对应的 userId 里包含了新添加了的作者的那些行
      const existingIds = throughQs.filter(through => includes(idsToAdd, through[fromFieldName]))
        .toRefArray().map(through => through[fromFieldName]);
  
      // 如果结果里面已经有新添加的作者了，即 User-Article 里面本来就有 articleId: 3, userId: 4, artcileId: 3, userId: 23 了
      // 这种情况下 article instance 新增的作者里面又包含有 userId 为 4 的，就重复了，很有可能是哪里出错了
      if (existingIds.length) {
        throw new Error(`
          Can't do the add operation, because the
          Tried to add already existing ${toModel.modelName} id(s) ${existingIds} to the ${fromModel.modelName} instance with id ${thisId}`
        );
      }
  
      // 如果结果里面已经有新添加的作者了，那么只需要在中间表中增加记录即可，否则还需要在 toModel 中创建记录
      // 先在对应的表（如 User）中创建记录
      addedArr
      .filter(v => !existingIds.includes(v[toModel.idAttribute]))
      .forEach(item => toModel.create(item));
      
      // 然后在中间表（如 Article-User）中创建记录
      idsToAdd.forEach(id => {
        throughModel.create({
          [fromFieldName]: reverse ? id : thisId,
          [toFieldName]: reverse ? thisId : id
        });
      });
    };

    // 删除中间表中如 articleId = 3 的那一行或者多行
    qs.clear = () => throughQs.delete();
  
    // 在中间表中移除 userId 等于某些值的行
    qs.remove = (...ids) => {
      const idsToRemove = ids.map(normalizeEntity);
      const entitiesToDelete = throughQs.filter(through => includes(idsToRemove, through[toFieldName]));

      if (__DEV__) {
        // 如果要删除的 id 在中间表的如 userId 里没有，那么可能是为了方便故意的也可能出错的，所以在开发模式下需要有 warning
        if (entitiesToDelete.count() !== idsToRemove.length) {
          const entitiesToDeleteIds = entitiesToDelete.toRefArray().map(through => through[toFieldName]);
          const unexistingIds = difference(idsToRemove, entitiesToDeleteIds);
    
          warning(
            `Tried to delete non-existing ${toModelName} id(s) ${unexistingIds} from the ${fromModelName} instance with id ${thisId}`
          );
        }
      }

      entitiesToDelete.delete();
    };

    return qs;
  },

  set () {
    throw new Error('You can\'t setting a many2Many field directly. Please use the related QuerySet methods add and remove.');
  }
}),
// 因为不需要每次 article.author 的时候都去创建这么多东西，qs 是可以缓存的，缓存的依据是 throughModelName + fieldName + reverse 相同
// 如 'Article-User--author--false'
(fromModelName, toModelName, throughModelName, throughFields, fieldName, reverse) =>
  throughModelName + '--' + fieldName + '--' + reverse);

const fieldToOneModelObjDescriptor = fieldToFkModelObjDescriptor;

// TODO 调整命名
export {
  attrDescriptor,
  fieldToFkModelObjDescriptor,
  fieldToOneModelObjDescriptor,
  fkModelObjToFieldDescriptor,
  oneModelObjToFieldDescriptor,
  manyToManyDescriptor
};
