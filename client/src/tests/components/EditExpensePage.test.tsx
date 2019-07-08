import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import { expenses } from '../fixtures/expensesStateFixture';
import { createBrowserHistory, History } from 'history';
import { Expense } from '../../types/expensesTypes';
import { match } from 'react-router';
import { ExpenseForm } from '../../components/ExpenseForm';
import moment from 'moment';

let expense: Expense,
  runEditExpenseSpy: (id: string, expense: Expense) => void,
  runRemoveExpenseSpy: (id: string) => void,
  history: History,
  match: match<{ id: string | undefined }>,
  wrapper: ShallowWrapper;

beforeEach(() => {
  expense = expenses[0];
  runEditExpenseSpy = jest.fn();
  runRemoveExpenseSpy = jest.fn();
  history = createBrowserHistory();
  history.push = jest.fn();
  match = {
    params: { id: expense.id },
    isExact: true,
    path: '',
    url: ''
  };
  wrapper = shallow(
    <EditExpensePage
      expense={expense}
      runEditExpense={runEditExpenseSpy}
      runRemoveExpense={runRemoveExpenseSpy}
      history={history}
      match={match}
    />
  );
});

test('should render EditExpensePage properly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should invoke edit an expense with expense id and revised data', () => {
  const revisedExpense = {
    name: expenses[0].name + 'foobar',
    amount: 500,
    id: expenses[0].id,
    createdAt: moment(expenses[0].createdAt)
      .add(2, 'weeks')
      .format(),
    description: expenses[0].description + 'foobar 2'
  };
  const onSubmit = wrapper.find(ExpenseForm).prop('onSubmit');
  onSubmit && onSubmit(revisedExpense);
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(runEditExpenseSpy).toHaveBeenLastCalledWith(
    revisedExpense.id,
    revisedExpense
  );
});

test('should invoke remove an expense with expense id', () => {
  wrapper.find('button#remove-expense-button').simulate('click');
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(runRemoveExpenseSpy).toHaveBeenLastCalledWith(expenses[0].id);
});
