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
    <ExpenseListFilters />
    <ExpensesSummary expenses={props.expenses} />
    <div>
      {props.expenses.length < 1 ? (
        <p>No expenses found.</p>
      ) : (
        props.expenses.map(e => <ExpenseListItem key={e.id} {...e} />)
      )}
    </div>
  </div>
);

const mapStateToProps = (state: ExpenseListStateProps) => ({
  expenses: filterExpenses(state.expenses, state.filters)
});

export default connect(mapStateToProps)(ExpenseList);