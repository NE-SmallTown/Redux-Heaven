/**
 * v0.0.1
 *
 * Copyright (c) 2017
 */

import findKey from 'lodash/findKey';

import {
  attrDescriptor,
  fieldToFkModelObjDescriptor,
  fkModelObjToFieldDescriptor,
  fieldToOneModelObjDescriptor,
  oneModelObjToFieldDescriptor,
  manyToManyDescriptor
} from './descriptors';

import {
  m2mName,
  reverseFieldErrorMessage
} from './utils';

/**
 * @module fields
 */
export class Attribute {
  constructor (opts) {
    this.opts = (opts || {});

    if (this.opts.hasOwnProperty('getDefault')) {
      this.getDefault = this.opts.getDefault;
    }
  }

  install (model, fieldName, orm) {
    Object.defineProperty(
      model.prototype,
      fieldName,
      attrDescriptor(fieldName)
    );
  }
}

class RelationalField {
  constructor (...args) {
    if (args.length === 1 && typeof args[0] === 'object') {
      const { to, fieldKeyInToMoel, through, throughFields } = args[0];

      this.toModelName = to;
      this.fieldKeyInToMoel = fieldKeyInToMoel;
      this.through = through;
      this.throughFields = throughFields;
    } else {
      this.toModelName = args[0];
      this.fieldKeyInToMoel = args[1];
    }

    if (typeof this.toModelName === 'undefined' || typeof this.fieldKeyInToMoel === 'undefined') {
      const toModelName = this.toModelName;
      const fieldKeyInToMoel = this.fieldKeyInToMoel;

      this.clearFields();

      throw new Error(`When you use fk or many, you must provide 'to' and 'fieldKeyInToMoel'(when you pass an object
        the function) or provide at least two arguments(arguments[0] for 'to', arguments[1] for 'fieldKeyInToMoel').
        both of then can't be undefined, but now passed in to: ${toModelName}, fieldKeyInToMoel: ${fieldKeyInToMoel}`
      );
    }
  }

  clearFields () {
    delete this.toModelName;
    delete this.fieldKeyInToMoel;
    delete this.through;
    delete this.toModelName;
  }

  getClass () {
    return this.constructor;
  }
}

export class ForeignKey extends RelationalField {
  install (model, fieldName, orm) {
    const toModelName = this.toModelName;
    const toModel = toModelName === 'this' ? model : orm.get(toModelName);

    const nameOfFieldToFkModelObj = fieldName;
    const nameOfFkModelObjToField = this.fieldKeyInToMoel;

    // TODO 对于 fk 和 many，需要在 fk 和 many 对应的 Model 里面添加一个以 ids 结尾的 field
    // 比如 Book 的 author 是 fk('User', 'books')，那么需要在 User 里面加上一个 booksIds 用来代表 books 的 id 列表
    // 从而避免使用的时候有大量的 user.books.toRefArray().map(({id}) => id) 这种
    Object.defineProperty(
      model.prototype,
      nameOfFieldToFkModelObj,
      fieldToFkModelObjDescriptor(fieldName, toModel.modelName)
    );

    const backwardsDescriptor = Object.getOwnPropertyDescriptor(
      toModel.prototype,
      nameOfFkModelObjToField
    );

    if (backwardsDescriptor) {
      const errorMsg = reverseFieldErrorMessage(
        model.modelName,
        fieldName,
        toModel.modelName,
        nameOfFkModelObjToField
      );
      throw new Error(errorMsg);
    }

    Object.defineProperty(
      toModel.prototype,
      nameOfFkModelObjToField,
      fkModelObjToFieldDescriptor(fieldName, model.modelName)
    );

    const ThisField = this.getClass();
    toModel.virtualFields[nameOfFkModelObjToField] = new ThisField(model.modelName, fieldName);
  }
}

export class ManyToMany extends RelationalField {
  install (model, fieldName, orm) {
    const toModelName = this.toModelName;
    const toModel = toModelName === 'this' ? model : orm.get(toModelName);

    const throughModelName =
      this.through ||
      m2mName(model.modelName, fieldName);

    const throughModel = orm.get(throughModelName);

    let throughFields;
    if (!this.throughFields) {
      const toFieldName = findKey(
        throughModel.fields,
        field =>
          field instanceof ForeignKey &&
          field.toModelName === toModel.modelName
      );
      const fromFieldName = findKey(
        throughModel.fields,
        field =>
          field instanceof ForeignKey &&
          field.toModelName === model.modelName
      );
      throughFields = {
        to: toFieldName,
        from: fromFieldName
      };
    } else {
      const [fieldAName, fieldBName] = this.throughFields;
      const fieldA = throughModel.fields[fieldAName];
      if (fieldA.toModelName === toModel.modelName) {
        throughFields = {
          to: fieldAName,
          from: fieldBName
        };
      } else {
        throughFields = {
          to: fieldBName,
          from: fieldAName
        };
      }
    }

    Object.defineProperty(
      model.prototype,
      fieldName,
      manyToManyDescriptor(
        model.modelName,
        toModel.modelName,
        throughModelName,
        throughFields,
        false
      )
    );

    model.virtualFields[fieldName] = new ManyToMany({
      to: toModel.modelName,
      fieldKeyInToMoel: fieldName,
      through: this.through,
      throughFields
    });

    const backwardsFieldName = this.fieldKeyInToMoel;

    const backwardsDescriptor = Object.getOwnPropertyDescriptor(
      toModel.prototype,
      backwardsFieldName
    );

    if (backwardsDescriptor) {
      // Backwards field was already defined on toModel.
      const errorMsg = reverseFieldErrorMessage(
        model.modelName,
        fieldName,
        toModel.modelName,
        backwardsFieldName
      );
      throw new Error(errorMsg);
    }

    Object.defineProperty(
      toModel.prototype,
      backwardsFieldName,
      manyToManyDescriptor(
        model.modelName,
        toModel.modelName,
        throughModelName,
        throughFields,
        true
      )
    );
    toModel.virtualFields[backwardsFieldName] = new ManyToMany({
      to: model.modelName,
      fieldKeyInToMoel: fieldName,
      through: throughModelName,
      throughFields
    });
  }

  getDefault () {
    return [];
  }
}

export class OneToOne extends RelationalField {
  install (model, fieldName, orm) {
    const toModelName = this.toModelName;
    const toModel = toModelName === 'this' ? model : orm.get(toModelName);

    Object.defineProperty(
      model.prototype,
      fieldName,
      fieldToOneModelObjDescriptor(fieldName, toModel.modelName)
    );

    const backwardsFieldName = this.fieldKeyInToMoel
      ? this.fieldKeyInToMoel
      : model.modelName.toLowerCase();

    const backwardsDescriptor = Object.getOwnPropertyDescriptor(
      toModel.prototype,
      backwardsFieldName
    );

    if (backwardsDescriptor) {
      const errorMsg = reverseFieldErrorMessage(
        model.modelName,
        fieldName,
        toModel.modelName,
        backwardsFieldName
      );
      throw new Error(errorMsg);
    }

    Object.defineProperty(
      toModel.prototype,
      backwardsFieldName,
      oneModelObjToFieldDescriptor(fieldName, model.modelName)
    );
    toModel.virtualFields[backwardsFieldName] = new OneToOne(model.modelName, fieldName);
  }
}

/**
 * Defines a value attribute on the model.
 * Though not required, it is recommended to define this for each non-foreign key you wish to use.
 * Getters and setters need to be defined on each Model
 * instantiation for undeclared data fields, which is slower.
 * You can use the optional `getDefault` parameter to fill in unpassed values
 * to {@link Model#create}, such as for generating ID's with UUID:
 *
 * ```javascript
 * import getUUID from 'your-uuid-package-of-choice';
 *
 * fields = {
 *   id: attr({ getDefault: () => getUUID() }),
 *   title: attr(),
 * }
 * ```
 *
 * @param  {Object} [opts]
 * @param {Function} [opts.getDefault] - if you give a function here, it's return
 *                                       value from calling with zero arguments will
 *                                       be used as the value when creating a new Model
 *                                       instance with {@link Model#create} if the field
 *                                       value is not passed.
 * @return {Attribute}
 */
export function attr (opts) {
  return new Attribute(opts);
}

/**
 * Defines a foreign key on a model, which points
 * to a single entity on another model.
 *
 * You can pass arguments as either a single object,
 * or two arguments.
 *
 * If you pass two arguments, the first one is the name
 * of the Model the foreign key is pointing to, and
 * the second one is an optional related name, which will
 * be used to access the Model the foreign key
 * is being defined from, from the target Model.
 *
 * If the related name is not passed, it will be set as
 * `${toModelName}Set`.
 *
 * If you pass an object to `fk`, it has to be in the form
 *
 * ```javascript
 * fields = {
 *   author: fk({ to: 'Author', fieldKeyInToMoel: 'books' })
 * }
 * ```
 *
 * Which is equal to
 *
 * ```javascript
 * fields = {
 *   author: fk('Author', 'books'),
 * }
 * ```
 *
 * @param  {string|boolean} toModelNameOrObj - the `modelName` property of
 *                                           the Model that is the target of the
 *                                           foreign key, or an object with properties
 *                                           `to` and optionally `fieldKeyInToMoel`.
 * @param {string} [fieldKeyInToMoel] - if you didn't pass an object as the first argument,
 *                                 this is the property name that will be used to
 *                                 access a QuerySet the foreign key is defined from,
 *                                 from the target model.
 * @return {ForeignKey}
 */
export function fk (...args) {
  return new ForeignKey(...args);
}

/**
 * Defines a many-to-many relationship between
 * this (source) and another (target) model.
 *
 * The relationship is modeled with an extra model called the through model.
 * The through model has foreign keys to both the source and target models.
 *
 * You can define your own through model if you want to associate more information
 * to the relationship. A custom through model must have at least two foreign keys,
 * one pointing to the source Model, and one pointing to the target Model.
 *
 * If you have more than one foreign key pointing to a source or target Model in the
 * through Model, you must pass the option `throughFields`, which is an array of two
 * strings, where the strings are the field names that identify the foreign keys to
 * be used for the many-to-many relationship. Redux-ORM will figure out which field name
 * points to which model by checking the through Model definition.
 *
 * Unlike `fk`, this function accepts only an object argument.
 *
 * ```javascript
 * class Authorship extends Model {}
 * Authorship.modelName = 'Authorship';
 * Authorship.fields = {
 *   author: fk('Author', 'authorships'),
 *   book: fk('Book', 'authorships'),
 * };
 *
 * class Author extends Model {}
 * Author.modelName = 'Author';
 * Author.fields = {
 *   books: many({
 *     to: 'Book',
 *     fieldKeyInToMoel: 'authors',
 *     through: 'Authorship',
 *
 *     // this is optional, since Redux-ORM can figure
 *     // out the through fields itself as there aren't
 *     // multiple foreign keys pointing to the same models.
 *     throughFields: ['author', 'book'],
 *   })
 * };
 *
 * class Book extends Model {}
 * Book.modelName = 'Book';
 * ```
 *
 * You should only define the many-to-many relationship on one side. In the
 * above case of Authors to Books through Authorships, the relationship is
 * defined only on the Author model.
 *
 * @param  {Object} options - options
 * @param  {string} options.to - the `modelName` attribute of the target Model.
 * @param  {string} [options.through] - the `modelName` attribute of the through Model which
 *                                    must declare at least one foreign key to both source and
 *                                    target Models. If not supplied, Redux-Orm will autogenerate
 *                                    one.
 * @param  {string[]} [options.throughFields] - this must be supplied only when a custom through
 *                                            Model has more than one foreign key pointing to
 *                                            either the source or target mode. In this case
 *                                            Redux-ORM can't figure out the correct fields for
 *                                            you, you must provide them. The supplied array should
 *                                            have two elements that are the field names for the
 *                                            through fields you want to declare the many-to-many
 *                                            relationship with. The order doesn't matter;
 *                                            Redux-ORM will figure out which field points to
 *                                            the source Model and which to the target Model.
 * @param  {string} [options.fieldKeyInToMoel] - the attribute used to access a QuerySet
 *                                          of source Models from target Model.
 * @return {ManyToMany}
 */
export function many (...args) {
  return new ManyToMany(...args);
}

/**
 * Defines a one-to-one relationship. In database terms, this is a foreign key with the
 * added restriction that only one entity can point to single target entity.
 *
 * The arguments are the same as with `fk`. If `fieldKeyInToMoel` is not supplied,
 * the source model name in lowercase will be used. Note that with the one-to-one
 * relationship, the `fieldKeyInToMoel` should be in singular, not plural.
 * @param  {string|boolean} toModelNameOrObj - the `modelName` property of
 *                                           the Model that is the target of the
 *                                           foreign key, or an object with properties
 *                                           `to` and optionally `fieldKeyInToMoel`.
 * @param {string} [fieldKeyInToMoel] - if you didn't pass an object as the first argument,
 *                                 this is the property name that will be used to
 *                                 access a Model the foreign key is defined from,
 *                                 from the target Model.
 * @return {OneToOne}
 */
export function oneToOne (...args) {
  return new OneToOne(...args);
}