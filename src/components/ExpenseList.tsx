import React from "react";
import { connect } from "react-redux";
import { Expense } from "../types/expensesTypes";
import { FiltersReducerState } from "../types/filtersTypes";
import ExpenseListItem from "./ExpenseListItem";
import ExpenseListFilters from "./ExpenseListFilters";
import filterExpenses from "../selectors/expensesSelector";

type ExpenseListStateProps = {
  expenses: Expense[];
  filters: FiltersReducerState;
};

const ExpenseList = (props: ExpenseListStateProps) => (
  <div>
    <h1>Expense List:</h1>
    <ExpenseListFilters />
    <div>
      {props.expenses.map(e => (
        <ExpenseListItem key={e.id} {...e} />
      ))}
    </div>
  </div>
);

const mapStateToProps = (state: ExpenseListStateProps) => ({
  expenses: filterExpenses(state.expenses, state.filters)
});

export default connect(mapStateToProps)(ExpenseList);
