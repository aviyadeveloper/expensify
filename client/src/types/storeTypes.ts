import { FiltersReducerState } from './filtersTypes';
import { expensesReducerState } from './expensesTypes';

export type storeStateType = expensesReducerState & FiltersReducerState;
