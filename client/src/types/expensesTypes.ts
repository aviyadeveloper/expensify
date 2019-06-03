import { Moment } from 'moment';

type Expense = {
  id?: string;
  name: string;
  description: string;
  amount: number | undefined;
  createdAt: Moment;
  [propName: string]: any;
};

type expensesReducerState = {
  expenses: Expense[];
};

export { Expense, expensesReducerState };
