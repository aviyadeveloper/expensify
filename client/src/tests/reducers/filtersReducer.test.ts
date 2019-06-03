import filtersReducer from '../../reducers/filtersReducer';
import { FiltersReducerState, FiltersSortBy } from '../../types/filtersTypes';
import moment from 'moment';

describe('Reducer Filter', () => {
  test('Should init a default filter reducer', () => {
    const state = filtersReducer(undefined, '@@INIT');
    expect(state).toEqual({
      name: '',
      sortBy: FiltersSortBy.Date,
      startDate: moment().startOf('month'),
      endDate: moment().endOf('month')
    });
  });

  test('Should set sortBy filter to amount enum', () => {
    const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });
    expect(state.sortBy).toBe(FiltersSortBy.Amount);
  });

  test('Should set sortBy filter to date enum', () => {
    const currentState = {
      name: null,
      sortBy: FiltersSortBy.Amount,
      startDate: undefined,
      endDate: undefined
    };
    const state = filtersReducer(undefined, { type: 'SORT_BY_DATE' });
    expect(state.sortBy).toBe(FiltersSortBy.Date);
  });

  test('Should set name filter', () => {
    const name = (Math.random() * 10000).toFixed(0);
    const action = {
      type: 'SET_NAME_FILTER',
      name
    };

    const state = filtersReducer(undefined, action);
    expect(state.name).toBe(name);
  });

  test('Should set startDate filter', () => {
    const date = moment('2010-05-12');
    const action = {
      type: 'SET_START_DATE',
      date
    };

    const state = filtersReducer(undefined, action);
    expect(state.startDate).toBe(date);
  });

  test('Should set endDate filter', () => {
    const date = moment('2012-04-25');
    const action = {
      type: 'SET_END_DATE',
      date
    };

    const state = filtersReducer(undefined, action);
    expect(state.endDate).toBe(date);
  });
});
