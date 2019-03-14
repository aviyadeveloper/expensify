import React from "react";
import { connect } from "react-redux";
import { Expense } from "../types/expensesTypes";
import { removeExpense } from "../actions/expensesActions";

const ExpenseListItem = (props: Expense) => (
  <div>
    <h5>{props.name}</h5>
    <p>{props.description}</p>
    <p>
      <span>{props.amount}</span> / <span>{props.createdAt}</span>
    </p>
    <button
      onClick={() => {
        props.dispatch(removeExpense({ id: props.id }));
      }}
    >
      Delete
    </button>
  </div>
);

export default connect()(ExpenseListItem);
