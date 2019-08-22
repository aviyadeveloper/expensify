type Expense = {
  id?: string;
  name?: string;
  description?: string;
  amount?: number | undefined;
  createdAt?: string;
  tags?: string[] | 0;
};

type expensesReducerState = {
  expenses: Array<Expense>;
};

export { Expense, expensesReducerState };
