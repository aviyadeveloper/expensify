import {
  addExpense,
  removeExpense,
  editExpense
} from '../../actions/expensesActions';
import moment from 'moment';

describe('Expenses Actions', () => {
  // ADD_EXPENSE with values
  test('Should return an ADD_EXPENSE action object with values', () => {
    const expenseData = {
      name: (Math.random() * 100000).toFixed(0),
      description: (Math.random() * 100000).toFixed(0),
      amount: parseInt((Math.random() * 100000).toFixed(0)),
      createdAt: moment()
    };
    const addObject = addExpense(expenseData);
    expect(addObject).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        ...expenseData,
        id: expect.any(String),
        createdAt: expenseData.createdAt.valueOf()
      }
    });
  });

  // ADD_EXPENSE with defaults
  test('Should return an ADD_EXPENSE action object with defaults', () => {
    const expenseData = {
      name: (Math.random() * 100000).toFixed(0)
    };
    const addObject = addExpense(expenseData);
    expect(addObject).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        ...expenseData,
        amount: 0,
        id: expect.any(String),
        description: '',
        createdAt: expect.any(Number)
      }
    });
  });

  // EDIT_EXPENSE
  test('Should return an EDIT_EXPENSE action object', () => {
    const id = (Math.random() * 100000).toFixed(0);
    const expenseData = {
      name: (Math.random() * 100000).toFixed(0),
      description: (Math.random() * 100000).toFixed(0),
      amount: parseInt((Math.random() * 100000).toFixed(0)),
      createdAt: moment()
    };
    const editObject = editExpense(id, expenseData);
    expect(editObject).toEqual({
      type: 'EDIT_EXPENSE',
      expense: {
        ...expenseData,
        id,
        createdAt: expenseData.createdAt.valueOf()
      }
    });
  });

  // REMOVE_EXPENSE
  test('Should return a REMOVE_EXPENSE action object', () => {
    const id = (Math.random() * 100000).toFixed(0);
    const removeObject = removeExpense({ id });
    expect(removeObject).toEqual({ id, type: 'REMOVE_EXPENSE' });
  });
});
