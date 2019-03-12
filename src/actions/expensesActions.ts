import uuidv1 from "uuid/v1";

// ADD_EXPENSE
type AddExpenseProps = {
  name: string;
  description?: string;
  amount?: number;
  createdAt?: number;
};

export const addExpense = ({
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

export const removeExpense = ({ id }: removeExpenseProps = {}) => ({
  type: "REMOVE_EXPENSE",
  id
});

// EDIT_EXPENSE
type EditExpenseUpdate = {
  name?: string;
  description?: string;
  amount?: number;
};

export const editExpense = (id: string, update: EditExpenseUpdate) => ({
  type: "EDIT_EXPENSE",
  id,
  update
});
