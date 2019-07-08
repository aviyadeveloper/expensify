import expensesReducer from '../../reducers/expensesReducer';
import moment from 'moment';
import { Expense } from '../../types/expensesTypes';
import { expenses } from '../fixtures/expensesStateFixture';

describe('Reducer: Expenses', () => {
  test('should setup a default reducer', () => {
    const state = expensesReducer(undefined, { type: '@@INIT', expense: {} });
    expect(state).toEqual([]);
  });

  test('should add an expense', () => {
    const expense: Expense = {
      name: (Math.random() * 1000).toFixed(0),
      amount: parseInt((Math.random() * 1000).toFixed(0)),
      description: (Math.random() * 1000).toFixed(0),
      createdAt: moment('2010-05-10').format()
    };
    const action = { type: 'ADD_EXPENSE', expense };

    const state = expensesReducer(expenses, action);
    expect(state).toEqual([...expenses, expense]);
  });

  test('should remove an expense by valid id', () => {
    const action = { type: 'REMOVE_EXPENSE', expense: expenses[1] };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2], expenses[3]]);
  });

  test('should not remove an expense without valid id', () => {
    const id = 'foobar';
    const action = { type: 'REMOVE_EXPENSE', expense: { id } };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
  });

  test('should edit an expense by id with new values', () => {
    const expense = {
      id: expenses[0].id,
      name: (Math.random() * 1000).toFixed(0),
      description: (Math.random() * 1000).toFixed(0),
      amount: parseInt((Math.random() * 1000).toFixed(0)),
      createdAt: moment('2005-05-25').format()
    };
    const action = { type: 'EDIT_EXPENSE', expense };
    const state = expensesReducer(expenses, action);

    expect(state).toEqual([expense, expenses[1], expenses[2], expenses[3]]);
  });

  test('should not edit an expense without valid id', () => {
    const expense = {
      id: 'foobar',
      name: (Math.random() * 1000).toFixed(0),
      description: (Math.random() * 1000).toFixed(0),
      amount: parseInt((Math.random() * 1000).toFixed(0)),
      createdAt: moment('2005-05-25').format()
    };
    const action = { type: 'EDIT_EXPENSE', expense };
    const state = expensesReducer(expenses, action);

    expect(state).toEqual(expenses);
  });
});

test('should set expenses', () => {
  const action = {
    type: 'SET_EXPENSES',
    expense: {},
    expenses: [expenses[0], expenses[1]]
  };
  const state = expensesReducer([], action);
  expect(state).toEqual([expenses[0], expenses[1]]);
});
