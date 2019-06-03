import React, { FormEvent } from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filtersStateFixture';
import { FiltersSortBy } from '../../types/filtersTypes';
import { DateRangePicker } from 'react-dates';
import moment, { Moment } from 'moment';

let setNameFilterSpy: (event: FormEvent<HTMLInputElement>) => void,
  sortByDateSpy: () => void,
  sortByAmountSpy: () => void,
  setStartDateSpy: (startDate: Moment) => void,
  setEndDateSpy: (endDate: Moment) => void,
  wrapper: ShallowWrapper;

beforeEach(() => {
  setNameFilterSpy = jest.fn();
  sortByDateSpy = jest.fn();
  sortByAmountSpy = jest.fn();
  setStartDateSpy = jest.fn();
  setEndDateSpy = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters
      filters={filters}
      setNameFilter={setNameFilterSpy}
      sortByDate={sortByDateSpy}
      sortByAmount={sortByAmountSpy}
      setStartDate={setStartDateSpy}
      setEndDate={setEndDateSpy}
    />
  );
});

test('should render ExpenseListFilters properly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with altFilters properly', () => {
  wrapper.setProps({ filters: altFilters });
  expect(wrapper).toMatchSnapshot();
});

test('should handle name change', () => {
  wrapper.find('input#expense-filter-name').simulate('change', {
    currentTarget: { value: 'foobar' }
  });
  expect(setNameFilterSpy).toHaveBeenLastCalledWith('foobar');
});

test('should sort by date', () => {
  wrapper.find('select#expense-filter-sortBy').simulate('change', {
    currentTarget: { value: FiltersSortBy.Date }
  });
  expect(sortByDateSpy).toHaveBeenCalled();
});

test('should sort by amount', () => {
  wrapper.find('select#expense-filter-sortBy').simulate('change', {
    currentTarget: { value: FiltersSortBy.Amount }
  });
  expect(sortByAmountSpy).toHaveBeenCalled();
});

test('should handle date changes', () => {
  const startDate: Moment = moment().add(2, 'years');
  const endDate: Moment = moment().add(10, 'years');
  const onDateChange = wrapper.find(DateRangePicker).prop('onDatesChange');
  onDateChange && onDateChange({ startDate, endDate });
  expect(setStartDateSpy).toHaveBeenLastCalledWith(startDate);
  expect(setEndDateSpy).toHaveBeenLastCalledWith(endDate);
});

test('should handle date focus changes', () => {
  const onFocusChange = wrapper.find(DateRangePicker).prop('onFocusChange');
  onFocusChange && onFocusChange('startDate');
  expect(wrapper.state('focusedInput')).toBe('startDate');
  onFocusChange && onFocusChange('endDate');
  expect(wrapper.state('focusedInput')).toBe('endDate');
});
