/**
 * v0.0.1
 *
 * Copyright (c) 2017
 */

import forOwn from 'lodash/forOwn';
import includes from 'lodash/includes';
import ops from 'immutable-ops';
import intersection from 'lodash/intersection';
import difference from 'lodash/difference';

/**
 * @module utils
 */

/**
 * Returns the branch name for a many-to-many relation.
 * The name is the combination of the model name and the model name the relation
 * was declared.
 *
 * Example: model `Article` has a many-to-many relation to the model `User`, defined
 * in the `Article` field `author`. The many-to-many branch name will be `Article-User`.
 *
 * @private
 * @param  {string} declarationModelName - the name of the model the many-to-many relation was declared on
 * @param  {string} toModelName - the model name where the many-to-many relation was declared on
 * @return {string} The branch name for the many-to-many relation.
 */
function m2mName (declarationModelName, toModelName) {
  return declarationModelName + '-' + toModelName;
}

/**
 * Returns the fieldname that saves a foreign key to the
 * model id where the many-to-many relation was declared.
 *
 * Example: `Author` => `fromAuthorId`
 *
 * @private
 * @param  {string} declarationModelName - the name of the model where the relation was declared
 * @return {string} the field name in the through model for `declarationModelName`'s foreign key.
 */
const m2mFromFieldName = declarationModelName => declarationModelName + 'Id';

/**
 * Returns the fieldname that saves a foreign key in a many-to-many through model to the
 * model where the many-to-many relation was declared.
 *
 * Example: `User` => `userId`
 *
 * @private
 * @param  {string} otherModelName - the name of the model that was the target of the many-to-many
 *                                   declaration.
 * @return {string} the field name in the through model for `otherModelName`'s foreign key..
 */
const m2mToFieldName = m2mFromFieldName;

function querySetDelegatorFactory (methodName) {
  return function querySetDelegator (...args) {
    return this.getQuerySet()[methodName](...args);
  };
}

function querySetGetterDelegatorFactory (getterName) {
  return function querySetGetterDelegator () {
    const qs = this.getQuerySet();
    return qs[getterName];
  };
}

function forEachSuperClass (subClass, func) {
  let currClass = subClass;
  while (currClass !== Function.prototype) {
    func(currClass);
    currClass = Object.getPrototypeOf(currClass);
  }
}

function attachQuerySetMethods (modelClass, querySetClass) {
  const leftToDefine = querySetClass.sharedMethods.slice();

  // There is no way to get a property descriptor for the whole prototype chain;
  // only from an objects own properties. Therefore we traverse the whole prototype
  // chain for querySet.
  forEachSuperClass(querySetClass, (cls) => {
    for (let i = 0; i < leftToDefine.length; i++) {
      let defined = false;
      const methodName = leftToDefine[i];
      const descriptor = Object.getOwnPropertyDescriptor(cls.prototype, methodName);
      if (typeof descriptor !== 'undefined') {
        if (typeof descriptor.get !== 'undefined') {
          descriptor.get = querySetGetterDelegatorFactory(methodName);
          Object.defineProperty(modelClass, methodName, descriptor);
          defined = true;
        } else if (typeof descriptor.value === 'function') {
          modelClass[methodName] = querySetDelegatorFactory(methodName);
          defined = true;
        }
      }
      if (defined) {
        leftToDefine.splice(i--, 1);
      }
    }
  });
}

/**
 * Normalizes `entity` to an id, where `entity` can be an id
 * or a Model instance.
 *
 * @private
 * @param  {*} entity - either a Model instance or an id value
 * @return {*} the id value of `entity`
 */
const normalizeEntity = entity => {
  if (!entity) {
    throw Error(`You must pass entity but got ${entity}`)
  }

  return entity.getId ? entity.getId() : entity;
};

function reverseFieldErrorMessage (modelName, fieldName, toModelName, backwardsFieldName) {
  return [`Reverse field ${backwardsFieldName} already defined`,
    ` on model ${toModelName}. To fix, set a custom related`,
    ` name on ${modelName}.${fieldName}.`].join('');
}

function objectShallowEquals (a, b) {
  let keysInA = 0;

  // eslint-disable-next-line consistent-return
  forOwn(a, (value, key) => {
    if (!b.hasOwnProperty(key) || b[key] !== value) {
      return false;
    }
    keysInA++;
  });

  return keysInA === Object.keys(b).length;
}

function arrayDiffActions (sourceArr, targetArr) {
  const itemsInBoth = intersection(sourceArr, targetArr);
  const deleteItems = difference(sourceArr, itemsInBoth);
  const addItems = difference(targetArr, itemsInBoth);

  if (deleteItems.length || addItems.length) {
    return {
      delete: deleteItems,
      add: addItems
    };
  }
  return null;
}

function putCandidateIdKeyIntoObject (obj, idAttribute, candidateIdKes) {
  if (!obj[idAttribute]) {
    for (const key of candidateIdKes) {
      if (obj[key]) {
          obj[idAttribute] = obj[key]
          break
      }
    }
  }
}

const { getBatchToken } = ops;

export {
  attachQuerySetMethods,
  m2mName,
  m2mFromFieldName,
  m2mToFieldName,
  normalizeEntity,
  reverseFieldErrorMessage,
  objectShallowEquals,
  ops,
  includes,
  arrayDiffActions,
  putCandidateIdKeyIntoObject,
  getBatchToken
};
