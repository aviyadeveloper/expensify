import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseForm } from '../../components/ExpenseForm';
import { expenses } from '../fixtures/expensesStateFixture';
import moment from 'moment';

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

test('should change state createdAt if date picker changes', () => {
  const wrapper = shallow(<ExpenseForm />);
  const testDate = moment('2010-05-20');
  const datePicker = wrapper.find('#expense-form-date');
  (datePicker.prop('onDateChange') as Function)(testDate);
  expect(wrapper.state('createdAt')).toBe(testDate.format());
});

test('Should change state of calendar focus on date picker focus', () => {
  const wrapper = shallow(<ExpenseForm />);
  const datePicker = wrapper.find('#expense-form-date');
  (datePicker.prop('onFocusChange') as Function)({ focused: true });
  expect(wrapper.state('calendarFocused')).toBe(true);
  (datePicker.prop('onFocusChange') as Function)({ focused: false });
  expect(wrapper.state('calendarFocused')).toBe(false);
});

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

test('should call onSubmit prop when valid data is submitted', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(
    <ExpenseForm {...expenses[0]} onSubmit={onSubmitSpy} />
  );
  wrapper
    .find('form')
    .first()
    .simulate('submit', {
      preventDefault: () => {}
    });
  expect(wrapper.state('error')).toBe('');
  expect(onSubmitSpy).toHaveBeenCalledWith({
    name: expenses[0].name,
    amount: expenses[0].amount,
    createdAt: expenses[0].createdAt,
    description: expenses[0].description
  });
});
