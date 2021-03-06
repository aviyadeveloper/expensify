import React from 'react';
import { connect } from 'react-redux';
import expensesTotalSelector from '../selectors/expensesTotalSelector';
import numeral from 'numeral';
import { Expense } from '../types/expensesTypes';
import { Link } from 'react-router-dom';

type ExpensesSummaryProps = {
  expenses: Expense[];
};

export const ExpensesSummary = (props: ExpensesSummaryProps) => (
  <div className="page-header">
    <div className="content-container">
      <div className="page-header__top">
        <h2 className="page-header__title">Dashboard</h2>
        <Link to="add" className="buttons__regular">
          Add Expense
        </Link>
      </div>
      <h4 className="page-header__subtitle">
        Viewing <span>{props.expenses.length}</span> expense
        {props.expenses.length !== 1 && 's'} totalling in{' '}
        <span>
          {numeral(expensesTotalSelector(props.expenses) / 100).format(
            '$0,0.00'
          )}
        </span>
      </h4>
    </div>
  </div>
);

export default connect()(ExpensesSummary);
