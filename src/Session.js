/**
 * v0.0.1
 *
 * Copyright (c) 2017
 */

import invariant from 'invariant';
import { getBatchToken } from 'immutable-ops';

import { QUERY, SUCCESS } from './constants';

// session 其实就是在模拟我们连接到数据库服务器进行操作的过程，数据库确实是存储了所有我们需要的数据
// 但是我们需要对数据进行加工，然后把加工后的数据存储在我们自己的某个地方，这里就是 session
const Session = class Session {
  /**
   * Creates a new Session.
   *
   * @param  {Database} db - a {@link Database} instance
   * @param  {Object} state - the database state
   * @param  {Boolean} [withMutations] - whether the session should mutate data
   * @param  {Object} [batchToken] - used by the backend to identify objects that can be
   *                                 mutated.
   */
  constructor (schema, db, state, withMutations, batchToken) {
    this.schema = schema;
    this.db = db;
    this.state = state || db.getState();
    this.initialState = this.state;

    this.withMutations = !!withMutations;
    this.batchToken = batchToken || getBatchToken();

    this._accessedModels = {};
    this.modelData = {};

    this.models = schema.getModelClasses();

    this.sessionBoundModels = this.models.map((modelClass) => {
      const sessionBoundModel = class SessionBoundModel extends modelClass {};
      Object.defineProperty(this, modelClass.modelName, {
        get: () => sessionBoundModel
      });

      sessionBoundModel.connect(this);
      return sessionBoundModel;
    });
  }

  markAccessed (modelName) {
    this.getDataForModel(modelName).accessed = true;
  }

  get accessedModels () {
    return this.sessionBoundModels
      .filter(model => !!this.getDataForModel(model.modelName).accessed)
      .map(model => model.modelName);
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
   * @param {Object} update - the update object. Must have keys
   *                          `type`, `payload`.
   */
  execute (updateSpec) {
    const { batchToken, withMutations } = this;
    const tx = { batchToken, withMutations };
    const { status, state, payload } = this.db.execute(updateSpec, tx, this.state);

    if (status === SUCCESS) {
      this.state = state;
    } else {
      invariant(false, `Applying update failed`);
    }

    return payload;
  }

  query (querySpec) {
    const { table } = querySpec;
    this.markAccessed(table);
    return this.db.execute({ action: QUERY, ...querySpec }, this.state);
  }
};

export default Session;
