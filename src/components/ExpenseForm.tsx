import React from 'react';
import moment, { Moment } from 'moment';
import { SingleDatePicker } from 'react-dates';
import { Expense } from '../types/expensesTypes';
import { isNull } from 'util';

type ExpenseFormProps = {
  onSubmit?: (expense: Expense) => void;
  name?: string;
  description?: string;
  amount?: number;
  createdAt?: Moment;
  calendarFocused?: boolean | null;
  error?: string;
  editMode?: boolean;
};

interface ExpenseFormState {
  name: string;
  description: string;
  amount: string;
  createdAt: Moment;
  calendarFocused: boolean | null;
  error: string;
  editMode?: boolean;
}

export class ExpenseForm extends React.Component<
  ExpenseFormProps,
  ExpenseFormState
> {
  state: ExpenseFormState = {
    name: this.props.name || '',
    description: this.props.description || '',
    amount: (this.props.amount && (this.props.amount / 100).toFixed(2)) || '',
    createdAt:
      (this.props.createdAt && moment(this.props.createdAt)) || moment(),
    calendarFocused: false,
    error: '',
    editMode: this.props.editMode
  };

  onNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    const name = e.currentTarget && e.currentTarget.value;
    this.setState({ name });
  };

  onAmountChange = (e: React.FormEvent<HTMLInputElement>) => {
    let amount = e.currentTarget && e.currentTarget.value;

    // Allow only cent based currency fit number format.
    (amount.match(/^[1-9]\d*(\.\d{0,2})?$/) || !amount) &&
      this.setState({ amount });
  };

  onDateChange = (createdAt: Moment | null) => {
    !isNull(createdAt) && this.setState({ createdAt });
  };

  onCalendarFocused = ({ focused }: { focused: boolean | null }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };

  onDescriptionChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    let description = e.currentTarget && e.currentTarget.value;
    this.setState({ description });
  };

  onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!this.state.amount || !this.state.name) {
      this.setState(() => ({ error: 'Name and amount are required' }));
    } else {
      this.setState(() => ({ error: '' }));
      {
        this.props.onSubmit &&
          this.props.onSubmit({
            name: this.state.name,
            amount: parseFloat(this.state.amount) * 100,
            description: this.state.description,
            createdAt: this.state.createdAt
          });
      }
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            id="expense-form-name"
            type="text"
            placeholder="name"
            autoFocus
            value={this.state.name}
            onChange={this.onNameChange}
          />
          <input
            id="expense-form-amount"
            type="text"
            placeholder="amount"
            value={this.state.amount}
            onChange={this.onAmountChange}
          />
          <SingleDatePicker
            id="expense-form-date"
            date={this.state.createdAt}
            onDateChange={this.onDateChange}
            focused={!!this.state.calendarFocused}
            onFocusChange={this.onCalendarFocused}
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
          <textarea
            id="expense-form-description"
            value={this.state.description}
            onChange={this.onDescriptionChange}
            placeholder="description"
          />
          {this.state.error && <p>{this.state.error}</p>}
          <button>{this.props.editMode ? 'Edit' : 'Add'}</button>
        </form>
      </div>
    );
  }
}
