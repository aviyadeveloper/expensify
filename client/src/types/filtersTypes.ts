import { Moment } from 'moment';

enum FiltersSortBy {
  Date,
  Amount
}

type FiltersReducerState = {
  name: string;
  sortBy: FiltersSortBy;
  startDate: Moment | null;
  endDate: Moment | null;
  tags: string[] | 0;
};

export { FiltersReducerState, FiltersSortBy };
