import {
  setEndDate,
  setNameFilter,
  setStartDate,
  sortByDate,
  sortByAmount
} from '../../actions/filtersActions';
import moment from 'moment';

describe('Filters Actions', () => {
  // SET_NAME_FILTER
  test('Should return a SET_NAME_FILTER action object with value', () => {
    const action = setNameFilter('foobar');
    expect(action).toEqual({
      type: 'SET_NAME_FILTER',
      name: 'foobar'
    });
  });

  test('Should return a SET_NAME_FILTER action object with default', () => {
    const action = setNameFilter();
    expect(action).toEqual({
      type: 'SET_NAME_FILTER',
      name: ''
    });
  });

  // SORT_BY_DATE
  test('Should return a SORT_BY_DATE action object', () => {
    const action = sortByDate();
    expect(action).toEqual({ type: 'SORT_BY_DATE' });
  });

  // SORT_BY_AMOUNT
  test('Should return a SORT_BY_AMOUNT action object', () => {
    const action = sortByAmount();
    expect(action).toEqual({ type: 'SORT_BY_AMOUNT' });
  });

  // SET_START_DATE
  test('Should return a SET_START_DATE action object', () => {
    const date = moment();
    const action = setStartDate(date);
    expect(action).toEqual({
      type: 'SET_START_DATE',
      date
    });
  });

  // SET_END_DATE
  test('Should return a SET_END_DATE action object', () => {
    const date = moment();
    const action = setEndDate(date);
    expect(action).toEqual({
      type: 'SET_END_DATE',
      date
    });
  });
});
