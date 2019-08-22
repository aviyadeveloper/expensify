import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Expense } from '../types/expensesTypes';
import moment from 'moment';
import numeral from 'numeral';

export const ExpenseListItem = (props: Expense) => (
  <Link className="expense-list__item" to={`/edit/${props.id}`}>
    <div>
      <h5 className="expense-list__item__title">{props.name}</h5>
      <span className="expense-list__item__description">
        {props.description}
      </span>
      <span className="expense-list__item__date">
        {moment(props.createdAt).format('MMMM Do, YYYY')}
      </span>
      <div className="expense-list__item__tags">
        {props.tags &&
          props.tags.map(tag => {
            return (
              <p key={tag} className="expense-list__item__tags__tag">
                {tag}
              </p>
            );
          })}
      </div>
    </div>
    <div className="expense-list__item__amount-container">
      <span className="expense-list__item__amount">
        {numeral(props.amount && props.amount / 100).format('$0,0.00')}
      </span>
    </div>
  </Link>
);

export default connect()(ExpenseListItem);
