import { FiltersReducerState, FiltersSortBy } from '../types/filtersTypes';
import moment from 'moment';

export const filtersReducerDefaultState: FiltersReducerState = {
  name: '',
  sortBy: FiltersSortBy.Date,
  startDate: moment().startOf('year'),
  endDate: moment().endOf('month'),
  tags: []
};

export default (
  state: FiltersReducerState = filtersReducerDefaultState,
  action: any
) => {
  switch (action.type) {
    case 'SET_NAME_FILTER':
      return { ...state, name: action.name };
    case 'SET_TAGS_FILTER':
      return { ...state, tags: action.tags };
    case 'SORT_BY_DATE':
      return { ...state, sortBy: FiltersSortBy.Date };
    case 'SORT_BY_AMOUNT':
      return { ...state, sortBy: FiltersSortBy.Amount };
    case 'SET_START_DATE':
      return { ...state, startDate: action.date };
    case 'SET_END_DATE':
      return { ...state, endDate: action.date };
    default:
      return state;
  }
};
