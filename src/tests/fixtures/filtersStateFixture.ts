import { FiltersReducerState, FiltersSortBy } from '../../types/filtersTypes';
import moment from 'moment';

export const filters: FiltersReducerState = {
  name: '',
  sortBy: FiltersSortBy.Date,
  startDate: moment().startOf('month'),
  endDate: moment().endOf('month')
};
