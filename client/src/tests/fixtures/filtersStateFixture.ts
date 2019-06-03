import { FiltersReducerState, FiltersSortBy } from '../../types/filtersTypes';
import moment from 'moment';

export const filters: FiltersReducerState = {
  name: '',
  sortBy: FiltersSortBy.Date,
  startDate: moment().startOf('month'),
  endDate: moment().endOf('month')
};

export const altFilters: FiltersReducerState = {
  name: 'Bill',
  sortBy: FiltersSortBy.Amount,
  startDate: moment().subtract(1, 'year'),
  endDate: moment().add(1, 'year')
};
