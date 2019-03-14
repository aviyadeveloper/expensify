import { Expense } from "../types/expensesTypes";

const expensesReducerDefaultState: Expense[] = [];

export default (
  state: Expense[] = expensesReducerDefaultState,
  action: any
) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.expense];
    case "REMOVE_EXPENSE":
      return state.filter(({ id }) => id !== action.id);
    case "EDIT_EXPENSE":
      console.log("EDIT EXPENSE", action);
      return state.map(e => (e.id === action.id ? action.expense : e));
    default:
      return [...state];
  }
};
