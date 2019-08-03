import React, { Dispatch } from 'react';
import { ExpenseForm } from './ExpenseForm';
import { Expense } from '../types/expensesTypes';
import { connect } from 'react-redux';
import { runEditExpense, runRemoveExpense } from '../actions/expensesActions';
import { History } from 'history';
import { match } from 'react-router';
import { storeStateType } from '../types/storeTypes';

export type EditExpensePageProps = {
  runEditExpense: (id: string, expense: Expense) => void;
  runRemoveExpense: (id: string) => void;
  match: match<{ id: string | undefined }>;
  expense: Expense | undefined;
  history: History;
};

export class EditExpensePage extends React.Component<EditExpensePageProps> {
  onEditExpense = (expense: Expense) => {
    if (this.props.expense && typeof this.props.expense.id === 'string') {
      this.props.runEditExpense(this.props.expense.id, expense);
      this.props.history.push('/dashboard');
    }
  };

  onRemoveExpense = () => {
    if (this.props.expense && typeof this.props.expense.id === 'string') {
      this.props.runRemoveExpense(this.props.expense.id);
      this.props.history.push('/dashboard');
    }
  };

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <div className="page-header__top">
              <h2 className="page-header__title">Editing Expense</h2>
              <button
                id="remove-expense-button"
                className="buttons__regular"
                onClick={this.onRemoveExpense}
              >
                Delete Expense
              </button>
            </div>
          </div>
        </div>
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

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  runEditExpense: (id: string, expense: Expense) => {
    dispatch(runEditExpense(id, expense));
  },
  runRemoveExpense: (id: string) => {
    dispatch(runRemoveExpense(id));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditExpensePage);
