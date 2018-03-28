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

function execute (tables, executeSpec, tx, state) {
  const { action, payload, table: tableName, query: querySpec, clauses } = executeSpec;

  const table = tables[tableName];
  const currTableState = state[tableName];
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
      table.insert(tx, currTableState, payload);

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
  const { tables: tablesSpec } = schemaSpec;
  const tables = mapValues(tablesSpec, tableSpec => new Table(tableSpec));

  return {
    getState: () => mapValues(tables, table => table.state),
    createReducer: () => (state, action) => {
      return tables.reduce((ret, table) => {
        const tableClass = table.constructor;
        if (typeof tableClass.reducer !== 'function') {
          throw Error(`there is no static reducer function in class(${tableClass.name})`);
        } else {
          tableClass.reducer(state, action, tableClass);
        }
      }, {});
    }
  };
};
