import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Expense } from '../types/expensesTypes';
import moment from 'moment';
import numeral from 'numeral';

export const ExpenseListItem = (props: Expense) => (
  <div>
    <Link to={`/edit/${props.id}`}>
      <h5>{props.name}</h5>
    </Link>
    <p>{props.description}</p>
    <p>
      <span>
        {numeral(props.amount && props.amount / 100).format('$0,0.00')}
      </span>{' '}
      / <span>{moment(props.createdAt).format('MMMM Do, YYYY')}</span>
    </p>
  </div>
);

export default connect()(ExpenseListItem);
