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

test('should change state name if input value changes', () => {
  const wrapper = shallow(<ExpenseForm />);
  const input = wrapper.find('input#expense-form-name');
  input.simulate('change', {
    currentTarget: {
      value: 'foobar'
    }
  });
  expect(wrapper.state('name')).toBe('foobar');
});

test('should change state amount if input value changes and valid', () => {
  const wrapper = shallow(<ExpenseForm />);
  const input = wrapper.find('input#expense-form-amount');
  input.simulate('change', {
    currentTarget: {
      value: '100'
    }
  });
  expect(wrapper.state('amount')).toBe('100');
});

test('should not change state amount if input value changes and invalid', () => {
  const wrapper = shallow(<ExpenseForm />);
  const input = wrapper.find('input#expense-form-amount');
  input.simulate('change', {
    currentTarget: {
      value: '100.1234'
    }
  });
  expect(wrapper.state('amount')).toBe('');
});

//put date test here
// test('should change state createdAt if input value changes', () => {
//   const wrapper = shallow(<ExpenseForm />);
// });

test('should change state description if input value changes', () => {
  const wrapper = shallow(<ExpenseForm />);
  const textarea = wrapper.find('textarea#expense-form-description');
  textarea.simulate('change', {
    currentTarget: {
      value: 'description here'
    }
  });
  expect(wrapper.state('description')).toBe('description here');
});
