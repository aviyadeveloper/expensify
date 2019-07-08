import { Expense } from '../types/expensesTypes';

const expensesReducerDefaultState: Expense[] = [];

type ExpensesReducerAction = {
  type: string;
  expense: Expense;
  expenses?: Expense[];
};

export default (state: Expense[] = [], action: ExpensesReducerAction) => {
  switch (action.type) {
    case 'SET_EXPENSES':
      return action.expenses;
    case 'ADD_EXPENSE':
      return [...state, action.expense];
    case 'REMOVE_EXPENSE':
      return state.filter(
        ({ id }) => action.expense && id !== action.expense.id
      );
    case 'EDIT_EXPENSE':
      return state.map(e =>
        e.id === (action.expense && action.expense.id) ? action.expense : e
      );
    default:
      return [...state];
  }
};
