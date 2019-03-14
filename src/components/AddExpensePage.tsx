import React, { Dispatch } from "react";
import { connect, DispatchProp } from "react-redux";
import { ExpenseForm } from "./ExpenseForm";
import { Expense } from "../types/expensesTypes";
import { addExpense } from "../actions/expensesActions";
import { AnyAction } from "redux";

const AddExpensePage: React.FC<DispatchProp> = (props: any) => (
  <div>
    <h2>Expensify add expense page</h2>
    <ExpenseForm
      onSubmit={(expense: Expense): void => {
        props.dispatch(addExpense(expense));
        props.history.push("/");
      }}
    />
  </div>
);

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  dispatch
});

export default connect(mapDispatchToProps)(AddExpensePage);
