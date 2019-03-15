import { createStore, combineReducers } from "redux";
import expensesReducer from "../reducers/expensesReducer";
import filtersReducer from "../reducers/filtersReducer";

export default () => {
  const store = createStore(
    combineReducers({ expenses: expensesReducer, filters: filtersReducer }),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
};
