/**
 * v0.0.1
 *
 * Copyright (c) 2017
 */

import deepMerge from 'lodash/merge';

import { SYMBOL_TABLE } from './constants';

const DEFAULT_TABLE_FIELDS = {
  idAttribute: 'id'
};

const getItemId = table => table[table.idAttribute];

export default class Table {
  constructor (fields) {
    this.$$typeof = SYMBOL_TABLE;
    this.ids = [];
    this.itemsById = {};
  }

  withId (id) {
    return this.itemsById[id];
  }

  hasId (id) {
    // TODO polyfill includes
    return this.ids.includes(id);
  }

  // insert 对于 id 已存在的情况会抛错，如果对于 id 已存在的情况想进行更新，请调用 upsert 方法
  insert (item) {
    return new Promise((resolve, reject) => {
      const itemId = getItemId(item);

      if (!this.hasId(itemId)) {
        this.ids.push(itemId);
        this.itemsById[itemId] = item;

        resolve();
      } else {
        reject(new Error(`Insert error: the item of ${this.idAttribute}(${itemId}) has existed in the ${this.constructor.name} Table`));
      }
    });
  }

  // create or update
  // upsert 对于 id 已存在的情况会进行 update，而 insert 则会抛错
  upsert (item) {
    return new Promise((resolve, reject) => {
      const itemId = getItemId(item);

      if (!this.hasId(itemId)) {
        this.insert(item);
      } else {
        this.update(item);
      }

      resolve();
    });
  }

  // 更新时默认是 shallow merge
  update (newItem, { isDeepMerge = true }) {
    return new Promise((resolve, reject) => {
      const itemId = getItemId(newItem);
      const oldItem = this.itemsById[itemId];

      if (this.hasId(itemId)) {
        if (isDeepMerge) {
          this.itemsById[itemId] = deepMerge({ ...oldItem }, newItem);
        } else {
          this.itemsById[itemId] = {
            ...oldItem,
            ...newItem
          };
        }
      } else {
        reject(new Error(`Update error: the item of ${this.idAttribute}(${itemId}) doesn't exist in the ${this.constructor.name} Table`));
      }

      resolve();
    });
  }

  delete (item) {
    return new Promise((resolve, reject) => {
      const itemId = getItemId(item);

      if (this.hasId(itemId)) {
        this.ids.splice(this.ids.indexOf(itemId), 1);
        delete this.itemsById[itemId];

        resolve();
      } else {
        reject(new Error(`Delete error: the item of ${this.idAttribute}(${itemId}) doesn't exist in the ${this.constructor.name} Table`));
      }
    });
  }

  query () {

  }

  getItemsArray () {

  }
}

