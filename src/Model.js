/**
 * v0.0.1
 *
 * Copyright (c) 2017
 */
import warning from 'warning';
import invariant from 'invariant';
import forOwn from 'lodash/forOwn';
import uniq from 'lodash/uniq';
import get from 'lodash/get';
import set from 'lodash/set';
import isPlainObject from 'lodash/isPlainObject';

import Session from './Session';
import QuerySet from './QuerySet';
import {
  ManyToMany,
  ForeignKey,
  OneToOne,
  attr
} from './fields';
import { CREATE, UPDATE, DELETE, FILTER } from './constants';
import {
  normalizeEntity,
  arrayDiffActions,
  objectShallowEquals,
  m2mName
} from './utils';

// Generates a query specification
// to get a single row from a table identified
// by a primary key.
function getByIdQuery (modelInstance) {
  const modelClass = modelInstance.getClass();
  return {
    table: modelClass.modelName,
    clauses: [
      {
        type: FILTER,
        payload: {
          [modelClass.idAttribute]: modelInstance.getId()
        }
      }
    ]
  };
}

// Table 作为底层抽象，确实不适合将 Model 的逻辑混合在里面，故还是延续了 redux-orm 将 Model 拆出来的方式
const Model = class Model {
  constructor (fields) {
    this.initFields(fields);
  }

  initFields (fields) {
    this._fields = { ...fields };

    forOwn(fields, (fieldValue, fieldName) => {
      // In this case, we got a prop that wasn't defined as a field.
      // Assuming it's an arbitrary data field, making an instance-specific
      // descriptor for it.
      // Using the in operator as the property could be defined anywhere
      // on the prototype chain.
      if (!(fieldName in this)) {
        Object.defineProperty(this, fieldName, {
          get: () => this._fields[fieldName],
          set: value => this.set(fieldName, value),
          configurable: true,
          enumerable: true
        });
      }
    });
  }

  static toString () {
    return `ModelClass: ${this.modelName}`;
  }

  static get _sessionData () {
    if (!this.session) return {};
    return this.session.getDataForModel(this.modelName);
  }

  static markAccessed () {
    this.session.markAccessed(this);
  }

  /**
   * Returns the id attribute of this {@link Model}.
   *
   * @return {string} The id attribute of this {@link Model}.
   */
  static get idAttribute () {
    return this.session.db.describe(this.modelName).idAttribute;
  }

  /**
   * Connect the model class to a {@link Session}.
   *
   * @private
   * @param  {Session} session - The session to connect to.
   */
  static connect (session) {
    if (!(session instanceof Session)) {
      throw Error('A model can only connect to a Session instance.');
    }

    this._session = session;
  }

  /**
   * Get the current {@link Session} instance.
   *
   * @private
   * @return {Session} The current {@link Session} instance.
   */
  static get session () {
    return this._session;
  }

  static getQuerySet () {
    return new QuerySet(this);
  }

  static invalidateClassCache () {
    this.isSetUp = undefined;
    this.virtualFields = {};
  }

  static get query () {
    return this.getQuerySet();
  }

  /**
   * Returns a {@link QuerySet} containing all {@link Model} instances.
   * @return {QuerySet} a QuerySet containing all {@link Model} instances
   */
  static all () {
    return this.getQuerySet();
  }

  /**
   * Update many-many relations for model.
   * @param relations
   */
  _refreshMany2Many (relations) {
    const ThisModel = this.getClass();
    const fields = ThisModel.fields;
    const virtualFields = ThisModel.virtualFields;

    Object.keys(relations).forEach((name) => {
      const reverse = !fields.hasOwnProperty(name);
      const field = virtualFields[name];
      const values = relations[name];

      // TODO 替换成 lodash 的 values 函数
      const normalizedNewIds = values.map(normalizeEntity);
      const uniqueIds = uniq(normalizedNewIds);

      if (normalizedNewIds.length !== uniqueIds.length) {
        throw new Error(`Found duplicate id(s) when passing "${normalizedNewIds}" to ${ThisModel.modelName}.${name} value`);
      }

      const throughModelName = field.through || m2mName(ThisModel.modelName, name);
      const ThroughModel = ThisModel.session[throughModelName];

      let fromField;
      let toField;

      if (!reverse) {
        ({ from: fromField, to: toField } = field.throughFields);
      } else {
        ({ from: toField, to: fromField } = field.throughFields);
      }

      const currentIds = ThroughModel.filter(through =>
        through[fromField] === this[ThisModel.idAttribute]
      ).toRefArray().map(ref => ref[toField]);

      const diffActions = arrayDiffActions(currentIds, normalizedNewIds);

      if (diffActions) {
        const idsToDelete = diffActions.delete;
        const idsToAdd = diffActions.add;
        if (idsToDelete.length > 0) {
          this[name].remove(...idsToDelete);
        }
        if (idsToAdd.length > 0) {
          this[name].add(...idsToAdd);
        }
      }
    });
  }

  /**
   * Creates a new record in the database, instantiates a {@link Model} and returns it.
   *
   * If you pass values for many-to-many fields, instances are created on the through
   * model as well.
   *
   * @param  {userProps} userProps - the new {@link Model}'s properties.
   * @return {Model} a new {@link Model} instance.
   */
  static create (userProps) {
    const ret = { ...userProps };
    const m2mRelations = {};

    Object.keys(this.fields).forEach(fieldKey => {
      const userPropsHasFieldKey = userProps.hasOwnProperty(fieldKey);
      if (!userPropsHasFieldKey) {
        warning(
          false,
          `The Model ${this.modelName} has field key: ${fieldKey}, but the object which you pass doesn't have the key`
        );
      }

      const modelField = this.fields[fieldKey];
      const userPropsField = userProps[fieldKey];

      // ManyToMany field 后面单独处理，先从最后的 ret 中移除
      if (modelField instanceof ManyToMany) {
        m2mRelations[fieldKey] = userPropsField;
        delete ret[fieldKey];

        return;
      }

      if (modelField instanceof ForeignKey) {
        // 对于 ForeignKey，存储的不应是实体，而是实体的 id
        // 即 reply.author 不应该是一个对象，而应该是 author 的 id
        const userPropsFieldId = userPropsField[this.idAttribute];
        invariant(
          typeof userPropsFieldId === 'undefined',
          `The ${fieldKey} in your object must have ${this.idAttribute} but passed in undefined`
        );

        ret[fieldKey] = userPropsFieldId;

        // 然后还需要在 Author 表中去创建对象
        this.session[modelField.fieldKeyInToMoel].create(userPropsField);
      } else {
        // 对于普通的 OneToOne（即 Atribute），直接存储其值
        ret[fieldKey] = userPropsField;
      }
    });

    // add backward many-many if required
    Object.keys(this.virtualFields).forEach(virtualFieldKey => {
      if (!m2mRelations.hasOwnProperty(virtualFieldKey) && userProps.hasOwnProperty(virtualFieldKey)) {
        const field = this.virtualFields[virtualFieldKey];

        if (field instanceof ManyToMany) {
          m2mRelations[virtualFieldKey] = userProps[virtualFieldKey];
          delete ret[virtualFieldKey];
        }
      }
    });

    const newEntry = this.session.execute({
      action: CREATE,
      table: this.modelName,
      payload: ret
    });

    const ModelClass = this;
    const instance = new ModelClass(newEntry);
    // 然后再把相关的属性加在中间表里面
    instance._refreshMany2Many(m2mRelations); // eslint-disable-line no-underscore-dangle
    return instance;
  }

  /**
   * Creates a new or update existing record in the database, instantiates a {@link Model} and returns it.
   *
   * If you pass values for many-to-many fields, instances are created on the through
   * model as well.
   *
   * @param  {userProps} userProps - the required {@link Model}'s properties.
   * @return {Model} a {@link Model} instance.
   */
  static upsert (userProps) {
    const idAttr = this.idAttribute;
    if (userProps.hasOwnProperty(idAttr) && this.hasId(userProps[idAttr])) {
      const model = this.withId(userProps[idAttr]);
      model.update(userProps);
      return model;
    }

    return this.create(userProps);
  }

  /**
   * Returns a {@link Model} instance for the object with id `id`.
   * This throws if the `id` doesn't exist. Use {@link Model#hasId}
   * to check for existence first if you're not certain.
   *
   * @param  {*} id - the `id` of the object to get
   * @throws If object with id `id` doesn't exist
   * @return {Model} {@link Model} instance with id `id`
   */
  static withId (id, notExistReturn = []) {
    if (!this.hasId(id)) {
      return notExistReturn;
    }

    const ModelClass = this;
    const rows = this._findDatabaseRows({ [ModelClass.idAttribute]: id });

    return new ModelClass(rows[0]);
  }

  /**
   * Returns a boolean indicating if an entity with the id `id` exists
   * in the state.
   *
   * @param  {*}  id - a value corresponding to the id attribute of the {@link Model} class.
   * @return {Boolean} a boolean indicating if entity with `id` exists in the state
   */
  static hasId (id) {
    const rows = this._findDatabaseRows({ [this.idAttribute]: id });
    return rows.length === 1;
  }

  static _findDatabaseRows (lookupObj) {
    const ModelClass = this;
    return ModelClass
      .session
      .query({
        table: ModelClass.modelName,
        clauses: [
          {
            type: FILTER,
            payload: lookupObj
          }
        ]
      }).rows;
  }

  /**
   * Gets the {@link Model} instance that matches properties in `lookupObj`.
   * Throws an error if {@link Model} is not found, or multiple records match
   * the properties.
   *
   * @param  {Object} lookupObj - the properties used to match a single entity.
   * @return {Model} a {@link Model} instance that matches `lookupObj` properties.
   */
  static get (lookupObj) {
    const ModelClass = this;

    const rows = this._findDatabaseRows(lookupObj);

    if (rows.length === 0) {
      throw new Error('Model instance not found when calling get method');
    } else if (rows.length > 1) {
      throw new Error(`Expected to find a single row in Model.get. Found ${rows.length}.`);
    }

    return new ModelClass(rows[0]);
  }

  /**
   * Gets the {@link Model} class or subclass constructor (the class that
   * instantiated this instance).
   *
   * @return {Model} The {@link Model} class or subclass constructor used to instantiate
   *                 this instance.
   */
  getClass () {
    return this.constructor;
  }

  /**
   * Gets the id value of the current instance by looking up the id attribute.
   * @return {*} The id value of the current instance.
   */
  getId () {
    return this._fields[this.getClass().idAttribute];
  }

  /**
   * Returns a reference to the plain JS object in the store.
   * Make sure to not mutate this.
   *
   * @return {Object} a reference to the plain JS object in the store
   */
  get ref () {
    const ModelClass = this.getClass();

    // eslint-disable-next-line no-underscore-dangle
    return ModelClass._findDatabaseRows({
      [ModelClass.idAttribute]: this.getId()
    })[0];
  }

  /**
   * Returns a string representation of the {@link Model} instance.
   *
   * @return {string} A string representation of this {@link Model} instance.
   */
  toString () {
    const ThisModel = this.getClass();
    const className = ThisModel.modelName;
    const fieldNames = Object.keys(ThisModel.fields);
    const fields = fieldNames.map((fieldName) => {
      const field = ThisModel.fields[fieldName];
      if (field instanceof ManyToMany) {
        const ids = this[fieldName].toModelArray().map(
          model => model.getId()
        );
        return `${fieldName}: [${ids.join(', ')}]`;
      }
      const val = this._fields[fieldName];
      return `${fieldName}: ${val}`;
    }).join(', ');
    return `${className}: {${fields}}`;
  }

  /**
   * Returns a boolean indicating if `otherModel` equals this {@link Model} instance.
   * Equality is determined by shallow comparing their attributes.
   *
   * @param  {Model} otherModel - a {@link Model} instance to compare
   * @return {Boolean} a boolean indicating if the {@link Model} instance's are equal.
   */
  equals (otherModel) {
    // eslint-disable-next-line no-underscore-dangle
    return objectShallowEquals(this._fields, otherModel._fields);
  }

  /**
   * Updates a property name to given value for this {@link Model} instance.
   * The values are immediately committed to the database.
   *
   * @param {string} propertyName - name of the property to set
   * @param {*} value - value assigned to the property
   * @return {undefined}
   */
  set (propertyName, value) {
    this.update({ [propertyName]: value });
  }

  /**
   * Assigns multiple fields and corresponding values to this {@link Model} instance.
   * The updates are immediately committed to the database.
   *
   * @param  {Object} userMergeObj - an object that will be merged with this instance.
   * @return {undefined}
   */
  update (newItem, other) {
    let mergeObj = { [this.constructor.idAttribute]: this[this.idAttribute] };

    // 使 newItem 支持字符串
    if (typeof newItem === 'string') {
      const nestedKey = newItem;
      newItem = other;

      let currentObj = this;
      let hasVisitedKey = '';
      nestedKey.split('.').reduce((nest, key, index, arr) => {
        hasVisitedKey += key;

        if (index === arr.length - 1) {
          nest[key] = other;
        } else {
          currentObj = get(currentObj, key);

          let temp;
          if (typeof currentObj !== 'object') {
            if (index !== arr.length - 1) {
              const remainKey = nestedKey.slice(hasVisitedKey.length);

              throw new Error(`your object is `, newItem, ` and you want to update ${nestedKey}, and currently
              we visit on ${hasVisitedKey}, but newItem.${hasVisitedKey} is ${currentObj}, it's not a object
              or an array, so we can't continue to visit for the remain key(i.e. ${remainKey}), so please adjust your
              key`
              );
            } else {
              temp = newItem;
            }
          }

          temp = { ...currentObj };
          set(nest, 'key', temp);

          return temp;
        }
      }, mergeObj);
    } else if (isPlainObject(newItem)) {
      for (const v of newItem) {
        if (typeof v === 'object') {
          throw new Error(`When your newItem is an object, it's value of each key must be a non-object/array,
            if you want to update a more deep structure, please make newItem as a string
            (i.e. model.update('foo.bar', newItem)`
          );
        }
      }

      mergeObj = { ...mergeObj, ...newItem };
    } else {
      throw new Error(`newItem must be a string or a plain object, but passed in ${newItem}`);
    }

    // 下面才是更新相关操作
    const ThisModel = this.constructor;

    const fields = ThisModel.fields;
    const virtualFields = ThisModel.virtualFields;
    const m2mRelations = {};

    // If an array of entities or id's is supplied for a
    // many-to-many related field, clear the old relations
    // and add the new ones.
    for (const updatedKey in mergeObj) { // eslint-disable-line no-restricted-syntax, guard-for-in
      if (fields.hasOwnProperty(updatedKey)) {
        const field = fields[updatedKey];

        // 如果新的 field 是 fk 或者 many，那么 field 既支持字符串，也支持对象/数组
        // 1. 当为字符串时，代表是一个 fk 的 id，即将 fk 的 id 由一个值变为另一个值，所以这个 id 必须在 fk 对
        // 应的 Model 中已经存在
        // 2. 当为对象时，代表是一个 fk 或者 many 的实例，即新增了一个实例作为新的 field 的值，所以不仅要更新此 Model，
        // 还要在 fk 和 many 对应的 Model 里面 create 这个实例
        if (field instanceof ForeignKey || field instanceof OneToOne) {
          // update one-one/fk relations
          mergeObj[updatedKey] = normalizeEntity(mergeObj[updatedKey]);
        } else if (field instanceof ManyToMany) {
          // field is forward relation
          m2mRelations[updatedKey] = mergeObj[updatedKey];
          delete mergeObj[updatedKey];
        }
      } else if (virtualFields.hasOwnProperty(updatedKey)) {
        const field = virtualFields[updatedKey];
        if (field instanceof ManyToMany) {
          // field is backward relation
          m2mRelations[updatedKey] = mergeObj[updatedKey];
          delete mergeObj[updatedKey];
        }
      }
    }

    // 对于不属于 fileds 里面的属性，需要直接加到 model 实例上
    this.initFields(Object.assign({}, this._fields, mergeObj));

    // 对于 many，需要同步
    this._refreshMany2Many(m2mRelations); // eslint-disable-line no-underscore-dangle

    ThisModel.session.execute({
      action: UPDATE,
      payload: mergeObj
    });
  }

  /**
   * Updates {@link Model} instance attributes to reflect the
   * database state in the current session.
   * @return {undefined}
   */
  refreshFromState () {
    this.initFields(this.ref);
  }

  /**
   * Deletes the record for this {@link Model} instance.
   * You'll still be able to access fields and values on the instance.
   *
   * @return {undefined}
   */
  delete () {
    this._onDelete();
    this.getClass().session.execute({
      action: DELETE,
      query: getByIdQuery(this)
    });
  }

  _onDelete () {
    const virtualFields = this.getClass().virtualFields;
    for (const key in virtualFields) { // eslint-disable-line
      const field = virtualFields[key];
      if (field instanceof ManyToMany) {
        // Delete any many-to-many rows the entity is included in.
        this[key].clear();
      } else if (field instanceof ForeignKey) {
        const relatedQs = this[key];
        if (relatedQs.exists()) {
          relatedQs.update({ [field.fieldKeyInToMoel]: null });
        }
      } else if (field instanceof OneToOne) {
        // Set null to any foreign keys or one to ones pointed to
        // this instance.
        if (this[key] !== null) {
          this[key][field.fieldKeyInToMoel] = null;
        }
      }
    }
  }
};

Model.fields = {
  id: attr()
};
Model.virtualFields = {};

export default Model;
