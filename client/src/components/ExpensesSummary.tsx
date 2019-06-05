import React from 'react';
import { connect } from 'react-redux';
import expensesTotalSelector from '../selectors/expensesTotalSelector';
import numeral from 'numeral';
import { Expense } from '../types/expensesTypes';

type ExpensesSummaryProps = {
  expenses: Expense[];
};

export const ExpensesSummary = (props: ExpensesSummaryProps) => (
  <div>
    <p>
      Viewing {props.expenses.length} expense
      {props.expenses.length !== 1 && 's'} totalling in{' '}
      {numeral(expensesTotalSelector(props.expenses) / 100).format('$0,0.00')}
    </p>
  </div>
);

export default connect()(ExpensesSummary);
