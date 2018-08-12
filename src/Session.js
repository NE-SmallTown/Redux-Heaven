/**
 * v0.0.1
 *
 * Copyright (c) 2017
 */

import invariant from 'invariant';
import { getBatchToken } from './immutable-ops';

import { QUERY, SUCCESS } from './constants';

// session 其实就是在模拟我们连接到数据库服务器进行操作的过程，数据库确实是存储了所有我们需要的数据
// 但是我们需要对数据进行加工，然后把加工后的数据存储在我们自己的某个地方，这里就是 session
const Session = class Session {
  /**
   * Creates a new Session.
   *
   * @param  {ORM} orm - a {@link ORM} instance
   * @param  {Database} db - a {@link Database} instance
   * @param  {Object} state - the database state
   * @param  {Boolean} [withMutations] - whether the session should mutate data
   * @param  {Object} [batchToken] - used by the backend to identify objects that can be
   *                                 mutated.
   */
  constructor (orm, db, state, withMutations, batchToken = getBatchToken()) {
    this.orm = orm;
    this.db = db;
    this.state = state || db.getState();
    this.withMutations = withMutations;
    this.batchToken = batchToken;
    this.modelData = {};
  
    orm.getModelClasses().forEach(model => {
      Object.defineProperty(this, model.modelName, {
        get: () => model
      });
    });
  }

  markAccessed (modelName) {
    this.getDataForModel(modelName).accessed = true;
  }

  getDataForModel (modelName) {
    if (!this.modelData[modelName]) {
      this.modelData[modelName] = {};
    }
    return this.modelData[modelName];
  }

  /**
   * Applies operation to a model state.
   *
   * @private
   * @param {Object} updateSpec - the update object. Must have keys `action`, `payload`.
   */
  // 对数据库执行某种操作
  execute (updateSpec) {
    const tx = { batchToken: this.batchToken, withMutations: this.withMutations };
    const { status, state, payload } = this.db.execute(updateSpec, tx, this.state);

    if (status === SUCCESS) {
      this.state = state;
  
      return payload;
    } else {
      invariant(false, `Applying update failed`);
    }
  }

  query (querySpec) {
    const { table } = querySpec;
    this.markAccessed(table);
    
    return this.db.execute({ action: QUERY, ...querySpec }, this.state);
  }
};

export default Session;
