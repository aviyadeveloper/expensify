import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { ExpenseForm } from './ExpenseForm';
import { Expense } from '../types/expensesTypes';
import { addExpense } from '../actions/expensesActions';
import { AnyAction } from 'redux';
import { History } from 'history';

type AddExpensePageProps = {
  onSubmit: (expense: Expense) => void;
  history: History;
};

export class AddExpensePage extends React.Component<AddExpensePageProps> {
  onSubmit = (expense: Expense): void => {
    this.props.onSubmit(expense);
    this.props.history.push('/');
  };
  render() {
    return (
      <div>
        <h2>Expensify add expense page</h2>
        <ExpenseForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  onSubmit: (expense: Expense) => dispatch(addExpense(expense))
});

export default connect<any>(
  undefined,
  mapDispatchToProps
)(AddExpensePage);
