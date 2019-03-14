import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Expense } from "../types/expensesTypes";
import { removeExpense } from "../actions/expensesActions";

const ExpenseListItem = (props: Expense) => (
  <div>
    <Link to={`/edit/${props.id}`}>
      <h5>{props.name}</h5>
    </Link>
    <p>{props.description}</p>
    <p>
      <span>{props.amount}</span> / <span>{props.createdAt}</span>
    </p>
  </div>
);

export default connect()(ExpenseListItem);
