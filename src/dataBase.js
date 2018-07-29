/**
 * v0.0.1
 *
 * Copyright (c) 2017
 */

import invariant from 'invariant';
import mapValues from 'lodash/mapValues';
import ops from 'immutable-ops';

import Table from './Table';
import { QUERY, CREATE, UPDATE, DELETE, SUCCESS } from './constants';

function replaceTableState (tableName, newTableState, tx, state) {
  const { batchToken, withMutations } = tx;

  if (withMutations) {
    state[tableName] = newTableState;
    return state;
  }

  return ops.batch.set(batchToken, tableName, newTableState, state);
}

// table 如 { Article: tableInstance, User: tableInstance }
// executeSpec 如 { action: CREATE, table: 'Article', payload: ret }
// tx = { batchToken, withMutations }

// tables 即包含的预先定义好的表，也包含了所有的中间表
function execute (tables, executeSpec, tx, state) {
  const { action, payload, table: tableName, clauses } = executeSpec;
  const table = tables[tableName];
  let nextTableState;
  let resultPayload;

  switch (action) {
    case QUERY:
    {
      const rows = table.query(state[tableName], clauses);

      return {
        rows
      };
    }
    case CREATE:
    {
      table.insert(payload, tx);

      nextTableState = table.state;
      resultPayload = payload;

      break;
    }
    case UPDATE:
    {
      nextTableState = table.update(payload, tx);

      break;
    }
    case DELETE:
    {
      const { rows } = table.query(state[tableName], clauses);
      nextTableState = table.delete(rows, tx);

      break;
    }
    default:
      invariant(false, `Database received unknown update type: ${action}`);
  }

  const nextDBState = replaceTableState(tableName, nextTableState, tx, state);
  
  return {
    status: SUCCESS,
    state: nextDBState,
    payload: resultPayload
  };
}

export const createDatabase = schemaSpec => {
  // 将 { tables: { Article: { fields: Article.fields }, User: { fields: User.fields } } } 转化为
  // { Article: tableInstance, User: tableInstance }
  const tables = mapValues(schemaSpec.tables, tableSpec => new Table(tableSpec));

  return {
    getState: () => mapValues(tables, table => table.state),
    createReducer: () => (state, action) => {
      return tables.reduce((ret, table) => {
        const tableClass = table.constructor;
        if (typeof tableClass.reducer !== 'function') {
          throw Error(`there is no static reducer function in the table: (${tableClass.name})`);
        } else {
          tableClass.reducer(state, action, tableClass);
        }
      }, {});
    },
    execute: (...args) => execute(tables, ...args)
  };
};
