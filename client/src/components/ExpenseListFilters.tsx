import React, { FormEvent } from 'react';
import { connect } from 'react-redux';
import {
  setNameFilter,
  sortByDate,
  sortByAmount,
  setStartDate,
  setEndDate
} from '../actions/filtersActions';
import { FiltersSortBy } from '../types/filtersTypes';
import { DateRangePicker } from 'react-dates';
import { Moment } from 'moment';
import { Dispatch } from 'redux';

export class ExpenseListFilters extends React.Component<any, any> {
  state = {
    focusedInput: null
  };

  onDatesChange = ({
    startDate,
    endDate
  }: {
    startDate: Moment | null;
    endDate: Moment | null;
  }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };

  onFocusChange = (focusedInput: 'startDate' | 'endDate' | null) => {
    this.setState({ focusedInput });
  };

  onNameChange = (event: FormEvent<HTMLInputElement>) => {
    this.props.setNameFilter(event.currentTarget.value || '');
  };

  onFilterTypeChange = (event: FormEvent<HTMLSelectElement>) => {
    const value: number = parseInt(event.currentTarget.value);
    switch (value) {
      case FiltersSortBy.Date:
        return this.props.sortByDate();
      case FiltersSortBy.Amount:
        return this.props.sortByAmount();
      default:
        return this.props.sortByDate();
    }
  };

  render() {
    return (
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__item">
            <input
              id="expense-filter-name"
              className="input-group__input"
              placeholder="Filter by name"
              value={this.props.filters.name}
              onChange={this.onNameChange}
            />
          </div>
          <div className="input-group__item">
            <select
              id="expense-filter-sortBy"
              className="input-group__input"
              value={this.props.filters.sortBy}
              onChange={this.onFilterTypeChange}
            >
              <option value={FiltersSortBy.Date}>Date</option>
              <option value={FiltersSortBy.Amount}>Amount</option>
            </select>
          </div>
          <div className="input-group__item">
            <DateRangePicker
              startDate={this.props.filters.startDate}
              startDateId={'sortByDate-filter-startDate'}
              endDate={this.props.filters.endDate}
              endDateId={'sortByDate-filter-endDate'}
              onDatesChange={this.onDatesChange}
              focusedInput={this.state.focusedInput}
              onFocusChange={this.onFocusChange}
              isOutsideRange={() => false}
              numberOfMonths={1}
              showClearDates={true}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  filters: state.filters
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setNameFilter: (name: string) => {
    dispatch(setNameFilter(name));
  },
  sortByAmount: () => {
    dispatch(sortByAmount());
  },
  sortByDate: () => {
    dispatch(sortByDate());
  },
  setStartDate: (startDate: Moment | null) => {
    dispatch(setStartDate(startDate));
  },
  setEndDate: (endDate: Moment | null) => {
    dispatch(setEndDate(endDate));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpenseListFilters);
