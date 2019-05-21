import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';
import { createBrowserHistory, History } from 'history';
import { ExpenseForm } from '../../components/ExpenseForm';
import { expenses } from '../fixtures/expensesStateFixture';
import { Expense } from '../../types/expensesTypes';

let onSubmitSpy: (expense: Expense) => void,
  historySpy: History,
  wrapper: ShallowWrapper;

beforeEach(() => {
  onSubmitSpy = jest.fn();
  historySpy = createBrowserHistory();
  historySpy.push = jest.fn();
  wrapper = shallow(
    <AddExpensePage onSubmit={onSubmitSpy} history={historySpy} />
  );
});

test('should render AddExpensePage properly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
  const onSubmit = wrapper.find(ExpenseForm).prop('onSubmit');
  onSubmit && onSubmit(expenses[0]);
  expect(onSubmitSpy).toHaveBeenLastCalledWith(expenses[0]);
  expect(historySpy.push).toHaveBeenLastCalledWith('/');
});
