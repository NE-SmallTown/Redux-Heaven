/**
 * v0.0.1
 *
 * Copyright (c) 2017
 */

import { CREATE, UPDATE, DELETE } from './constants';

let dataBaseState;

function execute (executeSpec, tables, tx) {
  const { action, payload } = executeSpec;

  let tableName;
  let nextTableState;
  let resultPayload;

  if (action === CREATE) {
    ({ table: tableName } = updateSpec);
    const table = tables[tableName];
    const currTableState = state[tableName];
    const result = table.insert(tx, currTableState, payload);
    nextTableState = result.state;
    resultPayload = result.created;
  } else {
    const { query: querySpec } = updateSpec;
    ({ table: tableName } = querySpec);
    const { rows } = query(tables, querySpec, state);

    const table = tables[tableName];
    const currTableState = state[tableName];

    if (action === UPDATE) {
      nextTableState = table.update(payload, tx);
    } else if (action === DELETE) {
      nextTableState = table.delete(rows, tx);
    } else {
      throw new Error(`Database received unknown update type: ${action}`);
    }
  }
}

export const createDataBase = tables => {
  tables.forEach(table => {
    dataBaseState[table.name] = table.state;
  });

  return {
    createReducer: () => (state, action) => {
      tables.forEach(table => {
        const tableClass = table.constructor;
        if (typeof tableClass.reducer !== 'function') {
          throw Error(`there is no reducer function in class(${tableClass.name})`);
        } else {
          tableClass.reducer(state, action, tableClass);
        }
      });
    }
  };
};
