import expensesSelector from '../../selectors/expensesSelector';
import { FiltersSortBy } from '../../types/filtersTypes';
import { expenses } from '../fixtures/expensesStateFixture';
import moment from 'moment';

describe('Expense Selector', () => {
  // Filter: Empty, SortBy: Date
  test('Empty conditions should return all expenses sorted by date', () => {
    const conditions = {
      name: '',
      sortBy: FiltersSortBy.Date,
      startDate: null,
      endDate: null,
      tags: []
    };
    const filtered = expensesSelector(expenses, conditions);
    expect(filtered).toEqual(expenses);
  });

  // Filter: Empty, SortBy: Amount
  test('Empty conditions should return all expenses sorted by amount', () => {
    const conditions = {
      name: '',
      sortBy: FiltersSortBy.Amount,
      startDate: null,
      endDate: null,
      tags: []
    };
    const filtered = expensesSelector(expenses, conditions);
    expect(filtered).toEqual([
      expenses[3],
      expenses[2],
      expenses[1],
      expenses[0]
    ]);
  });

  // Filter: name | SortBy: date
  test('Should filter by name value sort by date', () => {
    const conditions = {
      name: 'bil',
      sortBy: FiltersSortBy.Date,
      startDate: null,
      endDate: null,
      tags: []
    };
    const filtered = expensesSelector(expenses, conditions);
    expect(filtered).toEqual([expenses[0], expenses[1]]);
  });

  // Filter: name | SortBy: amount
  test('Should filter by name value sort by amount', () => {
    const conditions = {
      name: 'er',
      sortBy: FiltersSortBy.Amount,
      startDate: null,
      endDate: null,
      tags: []
    };
    const filtered = expensesSelector(expenses, conditions);
    expect(filtered).toEqual([expenses[3], expenses[1]]);
  });

  // Filter: startDate | SortBy: date
  test('Should filter by startDate value sort by date', () => {
    const conditions = {
      name: '',
      sortBy: FiltersSortBy.Date,
      startDate: moment('2014-01-01'),
      endDate: null,
      tags: []
    };
    const filtered = expensesSelector(expenses, conditions);
    expect(filtered).toEqual([expenses[2], expenses[3]]);
  });

  // Filter: startDate | SortBy: amount
  test('Should filter by startDate value sort by amount', () => {
    const conditions = {
      name: '',
      sortBy: FiltersSortBy.Amount,
      startDate: moment('2014-01-01'),
      endDate: null,
      tags: []
    };
    const filtered = expensesSelector(expenses, conditions);
    expect(filtered).toEqual([expenses[3], expenses[2]]);
  });

  // Filter: endDate | SortBy: date
  test('Should filter by endDate value sort by date', () => {
    const conditions = {
      name: '',
      sortBy: FiltersSortBy.Date,
      startDate: null,
      endDate: moment('2014-01-01'),
      tags: []
    };
    const filtered = expensesSelector(expenses, conditions);
    expect(filtered).toEqual([expenses[0], expenses[1]]);
  });

  // Filter: endDate | SortBy: amount
  test('Should filter by endDate value sort by amount', () => {
    const conditions = {
      name: '',
      sortBy: FiltersSortBy.Amount,
      startDate: null,
      endDate: moment('2014-01-01'),
      tags: []
    };
    const filtered = expensesSelector(expenses, conditions);
    expect(filtered).toEqual([expenses[1], expenses[0]]);
  });

  // Filter: startDate, endDate | SortBy: date
  test('Should filter by date range sort by date', () => {
    const conditions = {
      name: '',
      sortBy: FiltersSortBy.Date,
      startDate: moment('2012-01-20'),
      endDate: moment('2015-06-20'),
      tags: []
    };
    const filtered = expensesSelector(expenses, conditions);
    expect(filtered).toEqual([expenses[1], expenses[2]]);
  });

  // Filter: startDate, endDate | SortBy: amount
  test('Should filter by date range sort by amount', () => {
    const conditions = {
      name: '',
      sortBy: FiltersSortBy.Amount,
      startDate: moment('2012-01-20'),
      endDate: moment('2015-06-20'),
      tags: []
    };
    const filtered = expensesSelector(expenses, conditions);
    expect(filtered).toEqual([expenses[2], expenses[1]]);
  });

  // Filter: name, startDate, endDate |SortBy: date
  test('Should filter by name and date range, sort by date', () => {
    const conditions = {
      name: ' ',
      sortBy: FiltersSortBy.Date,
      startDate: moment('2012-01-20'),
      endDate: moment('2016-12-31'),
      tags: []
    };
    const filtered = expensesSelector(expenses, conditions);
    expect(filtered).toEqual([expenses[1], expenses[2]]);
  });

  // Filter: name, startDate, endDate | SortBy: amount
  test('Should filter by name and date range, sort by amount', () => {
    const conditions = {
      name: ' ',
      sortBy: FiltersSortBy.Amount,
      startDate: moment('2012-01-20'),
      endDate: moment('2016-12-31'),
      tags: []
    };
    const filtered = expensesSelector(expenses, conditions);
    expect(filtered).toEqual([expenses[2], expenses[1]]);
  });
});
