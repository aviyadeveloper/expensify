import {
  setExpenses,
  runSetExpenses,
  addExpense,
  runAddExpense,
  editExpense,
  removeExpense,
  runRemoveExpense,
  runEditExpense
} from '../../actions/expensesActions';

import { expenses } from '../fixtures/expensesStateFixture';
import { database } from '../../firebase/firebase';
import Firebase from 'firebase';

// Mock store setup
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
let store: any;
const middleware: any = [thunk];
const mockStore: any = configureStore(middleware);

beforeEach(done => {
  type expensesData = {
    [id: string]: Expense;
  };
  let expensesData: expensesData = {};
  expenses.forEach(({ id, name, amount, createdAt, description }: Expense) => {
    id
      ? (expensesData[id] = { name, amount, createdAt, description })
      : undefined;
  });
  database
    .ref('expenses')
    .set(expensesData)
    .then(done());

  store = mockStore({});
});

import moment from 'moment';
import { Expense } from '../../types/expensesTypes';

describe('Expenses Actions', () => {
  // SET_EXPENSES
  test('Should return a SET_EXPENSES action object with values', () => {
    const setObject = setExpenses(expenses);
    expect(setObject).toEqual({
      type: 'SET_EXPENSES',
      expenses
    });
  });

  test('Should fetch expenses from database and set them in store', done => {
    const store = mockStore({});
    store.dispatch(runSetExpenses()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'SET_EXPENSES',
        expenses
      });
      done();
    });
  });

  // ADD_EXPENSE with values
  test('Should return an ADD_EXPENSE action object with values', () => {
    const addObject = addExpense(expenses[0]);
    expect(addObject).toEqual({
      type: 'ADD_EXPENSE',
      expense: expenses[0]
    });
  });

  test('Should add expense to database and store', done => {
    const store = mockStore({});
    const expenseData = {
      name: 'foo',
      amount: 10025,
      createdAt: moment().format(),
      description: 'bar'
    };

    store
      .dispatch(runAddExpense(expenseData))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
          type: 'ADD_EXPENSE',
          expense: {
            id: expect.any(String),
            ...expenseData
          }
        });
        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
      })
      .then((snapshot: Firebase.database.DataSnapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
      });
  });

  test('Should add expense with defaults to database and store', done => {
    const store = mockStore({});
    const expenseData = {
      name: 'foobar'
    };
    const expectedData = {
      name: 'foobar',
      amount: 0,
      createdAt: moment().format(),
      description: ''
    };
    store
      .dispatch(runAddExpense(expenseData))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
          type: 'ADD_EXPENSE',
          expense: {
            id: expect.any(String),
            ...expectedData
          }
        });
        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
      })
      .then((snapshot: Firebase.database.DataSnapshot) => {
        expect(snapshot.val()).toEqual(expectedData);
        done();
      });
  });

  // EDIT_EXPENSE

  test('Should return an EDIT_EXPENSE action object', () => {
    const id = 'foobar';
    const expenseData = {
      name: 'blabla',
      description: 'boop',
      amount: 1000,
      createdAt: moment().format()
    };
    const editObject = editExpense(id, expenseData);
    expect(editObject).toEqual({
      type: 'EDIT_EXPENSE',
      expense: {
        ...expenseData,
        id
      }
    });
  });

  test('Should edit expense in database and store', done => {
    const store = mockStore({});
    const id: string = expenses[1].id || '';
    store
      .dispatch(
        runEditExpense(id, {
          name: 'edited',
          amount: 12345
        })
      )
      .then(() => {
        // Check that edited store
        const actions = store.getActions();
        expect(actions[0]).toEqual({
          type: 'EDIT_EXPENSE',
          expense: {
            name: 'edited',
            amount: 12345,
            id
          }
        });

        // check that edited database
        return database.ref(`expenses/${id}`).once('value');
      })
      .then((snapshot: Firebase.database.DataSnapshot) => {
        expect(snapshot.val()).toEqual({
          name: 'edited',
          amount: 12345,
          description: expenses[1].description,
          createdAt: expenses[1].createdAt
        });
        done();
      });
  });

  // REMOVE_EXPENSE
  test('Should return a REMOVE_EXPENSE action object', () => {
    const id = 'foobar';
    const removeObject = removeExpense({ id });
    expect(removeObject).toEqual({ expense: { id }, type: 'REMOVE_EXPENSE' });
    return database.ref(`expenses/${id}`).once('value');
  });

  test('Should remove expense from database and store', done => {
    const store = mockStore({});
    const id: string = expenses[2].id || '';
    store
      .dispatch(runRemoveExpense(id))
      .then(() => {
        // Check that removed from store
        const actions = store.getActions();
        expect(actions[0]).toEqual({
          type: 'REMOVE_EXPENSE',
          expense: { id }
        });
        // Check that removed from db
        return database.ref(`expenses/${id}`).once('value');
      })
      .then((snapshot: Firebase.database.DataSnapshot) => {
        expect(snapshot.val()).toBeNull();
        done();
      });
  });
});
