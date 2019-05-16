import uuidv1 from 'uuid/v1';
import { Moment } from 'moment';
import moment from 'moment';
import { Expense } from '../types/expensesTypes';

// ADD_EXPENSE
type AddExpenseProps = {
  name: string;
  description?: string;
  amount?: number;
  createdAt?: Moment;
};

export const addExpense = ({
  name = '',
  description = '',
  amount = 0,
  createdAt = moment()
}: AddExpenseProps) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuidv1(),
    name,
    description,
    amount,
    createdAt: createdAt.valueOf()
  }
});

// REMOVE_EXPENSE
type removeExpenseProps = {
  id?: string;
};

export const removeExpense = ({ id }: removeExpenseProps = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

// EDIT_EXPENSE
type EditExpenseUpdate = {
  name?: string;
  description?: string;
  amount?: number;
};

export const editExpense = (id: string, expense: Expense) => ({
  type: 'EDIT_EXPENSE',
  expense: {
    id,
    name: expense.name,
    description: expense.description,
    amount: expense.amount,
    createdAt: expense.createdAt.valueOf()
  }
});
