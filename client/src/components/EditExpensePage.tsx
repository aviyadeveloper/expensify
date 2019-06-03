import React, { Dispatch } from 'react';
import { ExpenseForm } from './ExpenseForm';
import { Expense, expensesReducerState } from '../types/expensesTypes';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { editExpense, removeExpense } from '../actions/expensesActions';
import { History } from 'history';
import { match } from 'react-router';
import { storeStateType } from '../types/storeTypes';
import moment = require('moment');

export type EditExpensePageProps = {
  editExpense: (id: string, expense: Expense) => void;
  removeExpense: (id: string) => void;
  match: match<{ id: string | undefined }>;
  expense: Expense | undefined;
  history: History;
};

export class EditExpensePage extends React.Component<EditExpensePageProps> {
  onEditExpense = (expense: Expense) => {
    if (this.props.expense && typeof this.props.expense.id === 'string') {
      this.props.editExpense(this.props.expense.id, expense);
      this.props.history.push('/');
    }
  };

  onRemoveExpense = () => {
    if (this.props.expense && typeof this.props.expense.id === 'string') {
      this.props.removeExpense(this.props.expense.id);
      this.props.history.push('/');
    }
  };

  render() {
    return (
      <div>
        <h4>Editing expense</h4>
        <button id="remove-expense-button" onClick={this.onRemoveExpense}>
          Delete
        </button>
        <ExpenseForm
          onSubmit={this.onEditExpense}
          editMode={true}
          {...this.props.expense}
        />
      </div>
    );
  }
}

const mapStateToProps = (
  state: storeStateType,
  props: EditExpensePageProps
) => ({
  expense: state.expenses.find(
    (expense: Expense): boolean => expense.id === props.match.params.id
  )
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  editExpense: (id: string, expense: Expense) => {
    dispatch(editExpense(id, expense));
  },
  removeExpense: (id: string) => {
    dispatch(removeExpense({ id }));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditExpensePage);
