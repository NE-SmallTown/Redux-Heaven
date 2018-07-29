/**
 * v0.0.1
 *
 * Copyright (c) 2017
 */

import deepMerge from 'lodash/merge';
import filter from 'lodash/filter';
import sortBy from 'lodash/sortBy';
import reject from 'lodash/reject';
import orderBy from 'lodash/orderBy';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import includes from 'lodash/includes';

import ops from './immutable-ops';
import { SYMBOL_TABLE, FILTER, EXCLUDE, ORDER_BY } from './constants';

// 越靠前的代表操作优先级越高
const OPERATION_PRIORIYY_QUEUE = [
  FILTER,
  EXCLUDE,
  ORDER_BY
];

const getOperationPriority = ({ type, payload }) => {
  const priority = OPERATION_PRIORIYY_QUEUE.indexOf(type);

  if (priority) {
    return priority;
  }

  return OPERATION_PRIORIYY_QUEUE.DEFAULT;
};

const DEFAULT_TABLE_ATTRIBUTES = {
  idAttribute: 'id',
  candidateIdKes: ['id'] // 这些里面的都有可能是 id，如 ['user_id', 'user_id', 'author_id'] 最终都会转化为 id 存储在 table 上
};

// TODO 数据库操作目前都使用的同步带 Promise，目的是为了将来可能的异步扩展
// 到时候只需要在异步完成的时候再 dispatch 一个 action 就行了
export default class Table {
  constructor (userAttributes) {
    this.$$typeof = SYMBOL_TABLE;
    this.ids = [];
    this.itemsById = {};
    this.localState = {
      ids      : this.ids,
      itemsById: this.itemsById
    };

    Object.assign(this, DEFAULT_TABLE_ATTRIBUTES, userAttributes);
  }

  getItemId (item) {
    if (item.hasOwnProperty(this.idAttribute)) {
      return item[this.idAttribute];
    } else {
      throw new Error(`The item ${JSON.stringify(item)} does not have the key \`${this.idAttribute}\` as the idAttribute`);
    }
  };

  get state () {
    return this.localState;
  }

  makeStateShallowMergeItSelf () {
    this.state = { ...this.state };
  }

  withId (id) {
    return this.itemsById[id];
  }

  hasId (id) {
    // TODO polyfill includes
    return this.ids.includes(id);
  }

  // insert 对于 id 已存在的情况会抛错，如果对于 id 已存在的情况想进行更新，请调用 upsert 方法
  insert (item, { batchToken }) {
      const itemId = this.getItemId(item);

      if (!this.hasId(itemId)) {
        this.ids = ops.batch.push(batchToken, itemId, this.ids);
        this.itemsById = ops.batch.merge(batchToken, { [itemId]: item }, this.itemsById);

        this.makeStateShallowMergeItSelf();
      } else {
        new Error(`Insert error: the item of ${this.idAttribute}(${itemId}) has existed in the ${this.constructor.name} Table`);
      }
  }

  // create or update
  // upsert 对于 id 已存在的情况会进行 update，而 insert 则会抛错
  upsert (item) {
    return Promise.resolve().then(() => {
      const itemId = this.getItemId(item);

      if (!this.hasId(itemId)) {
        this.insert(item);
      } else {
        this.update(item);
      }
    });
  }

  update (newItem, { batchToken }) {
    return new Promise((resolve, reject) => {
      const itemId = this.getItemId(newItem);
      const oldItem = this.itemsById[itemId];

      if (this.hasId(itemId)) {
        const result = ops.batch.merge(batchToken, newItem, this.itemsById[newItem[this.idAttribute]]);
        const newItemsById = ops.batch.set(batchToken, result[this.idAttribute], result, this.itemsById);

        this.makeStateShallowMergeItSelf();

        ops.batch.set(batchToken, 'itemsById', newItemsById, this.itemsById);
      } else {
        reject(new Error(`Update error: the item of ${this.idAttribute}(${itemId}) doesn't exist in the ${this.constructor.name} Table`));
      }

      resolve();
    });
  }

  delete (deletedIds, { batchToken }) {
    if (typeof deletedIds === 'function') {
      deletedIds = deletedIds();
    } else if (isString(deletedIds)) {
      deletedIds = [deletedIds];
    } else if (isArray(deletedIds)) {
      deletedIds = deletedIds.map(v =>
        isString(v)
          ? v
          : v[this.idAttribute]
      );
    } else {
      return Promise.reject(new Error(`DeletedIds argument must be a function, string or an array but passed in ${deletedIds}`));
    }

    return new Promise((resolve, reject) => {
      for (const itemId of deletedIds) {
        if (!this.hasId(itemId)) {
          reject(new Error(`Delete error: the item of ${this.idAttribute}(${itemId}) doesn't exist in the ${this.constructor.name} Table`));

          return;
        }
      }

      this.ids = ops.batch.filter(
        batchToken,
        id => !includes(deletedIds, id),
        this.ids
      );

      this.itemsById = ops.batch.omit(
        batchToken,
        deletedIds,
        this.itemsById
      );

      this.makeStateShallowMergeItSelf();

      resolve();
    });
  }

  query (item, operations) {
    // 先进行 filter，然后是 exclude，最后是其它，目的是加快查询
    // TODO 之前看的一个 youtube 视频讲到了函数的 lazyload 执行，比这种要先进很多，但是好像是理论模型
    // 之前找过一次没找到，后面再看看吧
    const optimizedOperations = sortBy(operations, getOperationPriority);

    return optimizedOperations.reduce((items, { type, payload }, index) => {
      switch (type) {
        case FILTER: {
          return filter(items, payload);
        }

        case EXCLUDE: {
          return reject(items, payload);
        }

        case ORDER_BY: {
          const { iteratees, orders } = payload;

          return orderBy(items, iteratees, orders);
        }

        default:
          return items;
      }
    }, this.getItemsArray());
  }

  getItemsArray () {
    return this.ids.map(id => this.itemsById[id]);
  }
}

