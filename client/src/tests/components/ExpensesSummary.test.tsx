import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';
import { expenses } from '../fixtures/expensesStateFixture';

test('Should render empty component (no expenses visible)', () => {
  const wrapper = shallow(<ExpensesSummary expenses={[]} />);
  expect(wrapper).toMatchSnapshot();
});

test('Should render component properly with 1 expense', () => {
  const wrapper = shallow(<ExpensesSummary expenses={[expenses[0]]} />);
  expect(wrapper).toMatchSnapshot();
});

test('Should render component properly with multiple expenses', () => {
  const wrapper = shallow(<ExpensesSummary expenses={expenses} />);
  expect(wrapper).toMatchSnapshot();
});
