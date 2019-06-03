import { createStore, combineReducers } from "redux";
import uuidv1 from "uuid/v1";
import validator from "validator";
import { v1 } from "uuid/interfaces";

// Reducers:

type Expense = {
  id: v1;
  name: string;
  description: string;
  amount: number;
  createdAt: number;
};

const expensesReducerDefaultState: Expense[] = [];

const expensesReducer = (
  state: Expense[] = expensesReducerDefaultState,
  action: any
) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.expense];
    case "REMOVE_EXPENSE":
      return state.filter(({ id }) => id !== action.id);
    case "EDIT_EXPENSE":
      return state.map(e =>
        e.id === action.id ? { ...e, ...action.update } : e
      );
    default:
      return [...state];
  }
};

enum FiltersSortBy {
  Date,
  Amount
}

type FiltersReducerState = {
  name: string;
  sortBy: FiltersSortBy;
  startDate: number | undefined;
  endDate: number | undefined;
};

const filtersReducerDefaultState: FiltersReducerState = {
  name: "",
  sortBy: FiltersSortBy.Date,
  startDate: undefined,
  endDate: undefined
};

const filtersReducer = (
  state: FiltersReducerState = filtersReducerDefaultState,
  action: any
) => {
  switch (action.type) {
    case "SET_NAME_FILTER":
      return { ...state, name: action.name };
    case "SORT_BY_DATE":
      return { ...state, sortBy: FiltersSortBy.Date };
    case "SORT_BY_AMOUNT":
      return { ...state, sortBy: FiltersSortBy.Amount };
    case "SET_START_DATE":
      return { ...state, startDate: action.date };
    case "SET_END_DATE":
      return { ...state, endDate: action.date };
    default:
      return state;
  }
};

// Actions:

// ADD_EXPENSE

type AddExpenseProps = {
  name: string;
  description?: string;
  amount?: number;
  createdAt?: number;
};

const addExpense = ({
  name = "",
  description = "",
  amount = 0,
  createdAt = 0
}: AddExpenseProps) => ({
  type: "ADD_EXPENSE",
  expense: {
    id: uuidv1(),
    name,
    description,
    amount,
    createdAt
  }
});

// REMOVE_EXPENSE

type removeExpenseProps = {
  id?: string;
};

const removeExpense = ({ id }: removeExpenseProps = {}) => ({
  type: "REMOVE_EXPENSE",
  id
});

// EDIT_EXPENSE

type EditExpenseUpdate = {
  name?: string;
  description?: string;
  amount?: number;
};

const editExpense = (id: string, update: EditExpenseUpdate) => ({
  type: "EDIT_EXPENSE",
  id,
  update
});

// SET_NAME_FILTER

const setNameFilter = (name: string = "") => ({
  type: "SET_NAME_FILTER",
  name
});

// SORT_BY_DATE

const sortByDate = () => ({
  type: "SORT_BY_DATE"
});

// SORT_BY_AMOUNT

const sortByAmount = () => ({
  type: "SORT_BY_AMOUNT"
});

// SET_START_DATE

const setStartDate = (date?: number) => ({
  type: "SET_START_DATE",
  date
});

// SET_END_DATE
const setEndDate = (date?: number) => ({
  type: "SET_END_DATE",
  date
});

// Display

const getVisibileExpenses = (
  expenses: Expense[],
  { name, startDate, endDate, sortBy }: FiltersReducerState
): Expense[] => {
  return expenses
    .filter(expense => {
      const startDateMatch =
        typeof startDate !== "number" || expense.createdAt >= startDate;
      const endDateMatch =
        typeof endDate !== "number" || expense.createdAt <= endDate;
      const nameMatch =
        typeof name !== "string" ||
        expense.name.toLocaleLowerCase().includes(name.toLowerCase());
      return startDateMatch && endDateMatch && nameMatch && expense;
    })
    .sort(
      (a, b): number => {
        if (sortBy === FiltersSortBy.Date) {
          return a.createdAt > b.createdAt ? 1 : -1;
        } else {
          return a.amount > b.amount ? 1 : -1;
        }
      }
    );
};

// Run

const store = createStore(
  combineReducers({ expenses: expensesReducer, filters: filtersReducer })
);

store.subscribe(() => {
  const state = store.getState();
  console.log("full state:", store.getState());
  console.log("filtered:", getVisibileExpenses(state.expenses, state.filters));
});

const expense1 = store.dispatch(
  addExpense({ name: "Foobar", createdAt: 1000 })
);

const expense2 = store.dispatch(
  addExpense({
    name: "Boop",
    description: "something nice",
    amount: 540,
    createdAt: 200
  })
);

const expense3 = store.dispatch(
  addExpense({
    name: "Bazz",
    description: "something pretty",
    amount: 240,
    createdAt: 800
  })
);

//store.dispatch(removeExpense({ id: expense1.expense.id }));

// store.dispatch(editExpense(expense2.expense.id, { amount: 12000 }));
// store.dispatch(setNameFilter());
// store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

store.dispatch(setNameFilter("foo"));
store.dispatch(setNameFilter("oo"));
store.dispatch(setNameFilter("opo"));
store.dispatch(setNameFilter());
store.dispatch(sortByAmount());
store.dispatch(sortByDate());
store.dispatch(sortByAmount());
store.dispatch(setStartDate(100));
store.dispatch(setStartDate(500));
store.dispatch(setEndDate(1200));
store.dispatch(setEndDate(900));
store.dispatch(setStartDate(100));
