import React, { Dispatch } from "react";
import { RouteProps } from "react-router";
import { ExpenseForm } from "./ExpenseForm";
import { Expense } from "../types/expensesTypes";
import { connect } from "react-redux";
import { AnyAction } from "redux";
import { editExpense } from "../actions/expensesActions";

const EditExpensePage: React.SFC<RouteProps> = (props: any) => (
  <div>
    <p>Editing expense: {props.match.params.id}</p>
    <ExpenseForm
      onSubmit={(expense: Expense) => {
        props.dispatch(editExpense(props.match.params.id, expense));
        props.history.push("/");
      }}
      {...props.expense}
    />
  </div>
);

const mapStateToProps = (
  state: React.ComponentState,
  props: React.ComponentProps<any>
) => ({
  expense: state.expenses.find(
    (expense: Expense): boolean => expense.id === props.match.params.id
  )
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditExpensePage);
