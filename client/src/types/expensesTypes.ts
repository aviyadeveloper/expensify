type Expense = {
  id?: string;
  name?: string;
  description?: string;
  amount?: number | undefined;
  createdAt?: string;
};

type expensesReducerState = {
  expenses: Expense[];
};

export { Expense, expensesReducerState };
