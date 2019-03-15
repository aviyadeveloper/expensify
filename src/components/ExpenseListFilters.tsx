import React from "react";
import { connect } from "react-redux";
import {
  setNameFilter,
  sortByDate,
  sortByAmount,
  setStartDate,
  setEndDate
} from "../actions/filtersActions";
import { FiltersSortBy } from "../types/filtersTypes";
import { DateRangePicker, FocusedInputShape } from "react-dates";
import { Moment } from "moment";

class ExpenseListFilters extends React.Component<any, any> {
  state = {
    focusedInput: null
  };

  nameFilter = React.createRef<HTMLInputElement>();
  sortByFilter = React.createRef<HTMLSelectElement>();

  onDatesChange = ({
    startDate,
    endDate
  }: {
    startDate: Moment | null;
    endDate: Moment | null;
  }) => {
    this.props.dispatch(setStartDate(startDate));
    this.props.dispatch(setEndDate(endDate));
  };

  onFocusChange = (focusedInput: "startDate" | "endDate" | null) => {
    this.setState({ focusedInput });
  };

  render() {
    return (
      <div>
        <input
          placeholder="filter by name"
          ref={this.nameFilter}
          value={this.props.filters.name}
          onChange={() => {
            this.props.dispatch(
              setNameFilter(
                (this.nameFilter.current && this.nameFilter.current.value) || ""
              )
            );
          }}
        />
        <select
          ref={this.sortByFilter}
          value={this.props.filters.sortBy}
          onChange={() => {
            if (this.sortByFilter.current) {
              const value: number = parseInt(this.sortByFilter.current.value);
              if (value === FiltersSortBy.Date) {
                return this.props.dispatch(sortByDate());
              }
              if (value === FiltersSortBy.Amount) {
                return this.props.dispatch(sortByAmount());
              }
            }
            //props.dispatch(sortByAmount());
          }}
        >
          <option value={FiltersSortBy.Date}>Date</option>
          <option value={FiltersSortBy.Amount}>Amount</option>
        </select>
        {this.props.filters.sortBy === FiltersSortBy.Date && (
          <DateRangePicker
            startDate={this.props.filters.startDate}
            startDateId={"sortByDate-filter-startDate"}
            endDate={this.props.filters.endDate}
            endDateId={"sortByDate-filter-endDate"}
            onDatesChange={this.onDatesChange}
            focusedInput={this.state.focusedInput}
            onFocusChange={this.onFocusChange}
            isOutsideRange={() => false}
            numberOfMonths={1}
            showClearDates={true}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  expenses: state.expenses,
  filters: state.filters
});

export default connect(mapStateToProps)(ExpenseListFilters);
