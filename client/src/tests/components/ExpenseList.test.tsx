import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseList } from '../../components/ExpenseList';
import { expenses } from '../fixtures/expensesStateFixture';
import { filters } from '../fixtures/filtersStateFixture';

test('Should generate expense list', () => {
  const wrapper = shallow(
    <ExpenseList expenses={expenses} filters={filters} />
  );
  expect(wrapper).toMatchSnapshot();
});

test('Should give expense not found message if expenses empty', () => {
  const wrapper = shallow(<ExpenseList expenses={[]} filters={filters} />);
  expect(wrapper).toMatchSnapshot();
});
