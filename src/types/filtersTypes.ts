enum FiltersSortBy {
  Date,
  Amount
}

type FiltersReducerState = {
  name: string;
  sortBy: FiltersSortBy;
  startDate: number | undefined;
  endDate: number | undefined;
};

export { FiltersReducerState, FiltersSortBy };
