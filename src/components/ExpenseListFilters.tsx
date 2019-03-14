import React from "react";
import { connect } from "react-redux";
import {
  setNameFilter,
  sortByDate,
  sortByAmount
} from "../actions/filtersActions";
import { FiltersReducerState, FiltersSortBy } from "../types/filtersTypes";

const ExpenseListFilters = (props: any) => {
  let nameFilter = React.createRef<HTMLInputElement>();
  let sortByFilter = React.createRef<HTMLSelectElement>();

  return (
    <div>
      <input
        placeholder="filter by name"
        ref={nameFilter}
        value={props.filters.name}
        onChange={() => {
          props.dispatch(
            setNameFilter(
              (nameFilter.current && nameFilter.current.value) || ""
            )
          );
        }}
      />
      <select
        ref={sortByFilter}
        value={props.filters.sortBy}
        onChange={() => {
          if (sortByFilter.current) {
            const value: number = parseInt(sortByFilter.current.value);
            if (value === FiltersSortBy.Date) {
              return props.dispatch(sortByDate());
            }
            if (value === FiltersSortBy.Amount) {
              return props.dispatch(sortByAmount());
            }
          }
          //props.dispatch(sortByAmount());
        }}
      >
        <option value={FiltersSortBy.Date}>Date</option>
        <option value={FiltersSortBy.Amount}>Amount</option>
      </select>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  expenses: state.expenses,
  filters: state.filters
});

export default connect(mapStateToProps)(ExpenseListFilters);
