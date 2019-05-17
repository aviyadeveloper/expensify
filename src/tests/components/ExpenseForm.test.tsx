import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseForm } from '../../components/ExpenseForm';
import { expenses } from '../fixtures/expensesStateFixture';

test('should render ExpenseForm correctly', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseForm with expense data', () => {
  const wrapper = shallow(<ExpenseForm {...expenses[0]} />);
  expect(wrapper).toMatchSnapshot();
});
