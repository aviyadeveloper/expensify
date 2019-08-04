import React from 'react';
import { connect } from 'react-redux';
import { Expense } from '../types/expensesTypes';
import { FiltersReducerState } from '../types/filtersTypes';
import ExpenseListItem from './ExpenseListItem';
import ExpenseListFilters from './ExpenseListFilters';
import filterExpenses from '../selectors/expensesSelector';
import { ExpensesSummary } from './ExpensesSummary';

type ExpenseListStateProps = {
  expenses: Expense[];
  filters: FiltersReducerState;
};

export const ExpenseList = (props: ExpenseListStateProps) => (
  <div>
    <ExpensesSummary expenses={props.expenses} />
    <ExpenseListFilters />
    <div className="content-container">
      <div className="show-on-desktop-only expense-list__headline">
        <h5>Expense</h5>
        <h5>Amount</h5>
      </div>
      <div className="show-on-mobile-only expense-list__headline">
        <h5>Expenses</h5>
      </div>
      <div className="expense-list__body">
        {props.expenses.length < 1 ? (
          <div className="expense-list__item expense-list__item--message">
            <p>No expenses found.</p>
          </div>
        ) : (
          props.expenses.map(e => <ExpenseListItem key={e.id} {...e} />)
        )}
      </div>
    </div>
  </div>
);

const mapStateToProps = (state: ExpenseListStateProps) => ({
  expenses: filterExpenses(state.expenses, state.filters)
});

export default connect(mapStateToProps)(ExpenseList);
