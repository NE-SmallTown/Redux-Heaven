/**
 * v0.0.1
 *
 * Copyright (c) 2017
 */

export const createDataBase = tables => {
  tables.forEach(table => {

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
