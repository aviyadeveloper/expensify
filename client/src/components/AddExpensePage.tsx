import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { ExpenseForm } from './ExpenseForm';
import { Expense } from '../types/expensesTypes';
import { runAddExpense } from '../actions/expensesActions';
import { History } from 'history';

type AddExpensePageProps = {
  runAddExpense: (expense: Expense) => void;
  history: History;
};

export class AddExpensePage extends React.Component<AddExpensePageProps> {
  runAddExpense = (expense: Expense): void => {
    this.props.runAddExpense(expense);
    this.props.history.push('/dashboard');
  };
  render() {
    return (
      <div>
        <h2>Expensify add expense page</h2>
        <ExpenseForm onSubmit={this.runAddExpense} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<Function>) => ({
  runAddExpense: (expense: Expense) => dispatch(runAddExpense(expense))
});

export default connect<any>(
  undefined,
  mapDispatchToProps
)(AddExpensePage);
