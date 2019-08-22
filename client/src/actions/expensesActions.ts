import { database } from '../firebase/firebase';
import * as firebase from 'firebase';
import moment from 'moment';
import { Expense } from '../types/expensesTypes';
import { Action } from 'redux';

/************* */
/* Add Expense */
/************* */

export interface AddExpense extends Action<string> {
  expense: Expense;
}

export const addExpense = (expense: Expense) => ({
  type: 'ADD_EXPENSE',
  expense
});

export const runAddExpense = (expenseData: Expense) => {
  return (dispatch: Function, getState: Function) => {
    const uid = getState().auth.uid;
    // Provide default values in case of null expense properties
    const {
      name = '',
      description = '',
      amount = 0,
      createdAt = moment().format(),
      tags = 0
    } = expenseData;

    // Build expense object
    const expense: Expense = { name, description, amount, createdAt, tags };

    // Add expense to db
    return database
      .ref(`users/${uid}/expenses`)
      .push(expense)
      .then((ref: firebase.database.Reference) => {
        dispatch(
          addExpense({
            id: ref.key || undefined,
            ...expense
          })
        );
      })
      .catch(error => {
        console.log('error:', error.message);
      });
  };
};

/**************** */
/* REMOVE_EXPENSE */
/**************** */

export const removeExpense = (expense: Expense) => ({
  type: 'REMOVE_EXPENSE',
  expense
});

export const runRemoveExpense = (id: string) => {
  return (dispatch: Function, getState: Function) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/expenses/${id}`)
      .remove()
      .then(() => {
        dispatch(removeExpense({ id }));
      })
      .catch(error => {
        console.log(error.message);
      });
  };
};

/************** */
/* EDIT_EXPENSE */
/************** */

// type EditExpenseUpdate = {
//   name?: string;
//   description?: string;
//   amount?: number;
// };

export const editExpense = (id: string, expense: Expense) => ({
  type: 'EDIT_EXPENSE',
  expense: {
    id,
    ...expense
  }
});

export const runEditExpense = (id: string, expense: Expense) => {
  // Avoid sending empty array to Firebase since it doesn't handle it
  // Instead turn array to number 0 to signify empty array.
  if (typeof expense.tags === 'object' && expense.tags.length < 1) {
    expense.tags = 0;
  }

  return (dispatch: Function, getState: Function) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/expenses/${id}`)
      .update(expense)
      .then(() => {
        if (expense.tags === 0) {
          expense.tags = [];
        }
        dispatch(editExpense(id, expense));
      })
      .catch(error => {
        console.log(error.message);
      });
  };
};

/************** */
/* SET_EXPENSES */
/************** */

export const setExpenses = (expenses: Expense[]) => ({
  type: 'SET_EXPENSES',
  expenses
});

export const runSetExpenses = () => {
  return (dispatch: Function, getState: Function) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/expenses`)
      .once('value')
      .then(snapshot => {
        const expenses: Expense[] = [];
        snapshot.forEach(e => {
          let value = e.val();
          if (value.tags === 0) {
            value.tags = [];
          }
          expenses.push({
            id: e.key || undefined,
            ...value
          });
        });
        dispatch(setExpenses(expenses));
      });
  };
};
