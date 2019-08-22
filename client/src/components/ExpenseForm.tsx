import React from 'react';
import moment, { Moment } from 'moment';
import { SingleDatePicker } from 'react-dates';
import { Expense } from '../types/expensesTypes';
import { isNull } from 'util';
import { TagsSelector } from './TagsSelector';

type ExpenseFormProps = {
  onSubmit?: (expense: Expense) => void;
  name?: string;
  description?: string;
  amount?: number;
  createdAt?: string;
  tags?: string[] | 0;
  calendarFocused?: boolean | null;
  error?: string;
  editMode?: boolean;
  availableTags?: string[];
};

interface ExpenseFormState {
  name: string;
  description: string;
  amount: string;
  createdAt: string;
  tags: string[] | 0;
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
      (this.props.createdAt && moment(this.props.createdAt).format()) ||
      moment().format(),
    tags: this.props.tags || [],
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

  onDateChange = (newDate: Moment | null): void => {
    !isNull(newDate) && this.setState({ createdAt: newDate.format() });
  };

  onCalendarFocused = ({ focused }: { focused: boolean | null }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };

  onDescriptionChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    let description = e.currentTarget && e.currentTarget.value;
    this.setState({ description });
  };

  populateTags = (tags: string[]): void => {
    this.setState({ tags });
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
            createdAt: this.state.createdAt,
            tags: this.state.tags
          });
      }
    }
  };

  render() {
    return (
      <div className="content-container">
        <form className="input-group-vertical" onSubmit={this.onSubmit}>
          <div className="input-group__item">
            <input
              id="expense-form-name"
              className="input-group__input"
              type="text"
              placeholder="name"
              autoFocus
              value={this.state.name}
              onChange={this.onNameChange}
            />
          </div>
          <div className="input-group__item">
            <input
              id="expense-form-amount"
              className="input-group__input"
              type="text"
              placeholder="amount"
              value={this.state.amount}
              onChange={this.onAmountChange}
            />
          </div>
          <div className="input-group__item">
            <SingleDatePicker
              id="expense-form-date"
              date={moment()}
              onDateChange={this.onDateChange}
              focused={!!this.state.calendarFocused}
              onFocusChange={this.onCalendarFocused}
              numberOfMonths={1}
              isOutsideRange={() => false}
            />
          </div>
          <div className="input-group__item">
            <textarea
              id="expense-form-description"
              className="input-group__input-long"
              value={this.state.description}
              onChange={this.onDescriptionChange}
              placeholder="description"
            />
          </div>
          <div className="input-group__item">
            <TagsSelector
              tags={this.state.tags}
              populateTags={this.populateTags}
              availableTags={this.props.availableTags || []}
              suggestion=""
            />
          </div>
          {this.state.error && (
            <p className="input-group__error">{this.state.error}</p>
          )}
          <div className="layout__rtl">
            <button className="buttons__regular">
              {this.props.editMode ? 'Save Expense' : 'Add Expense'}
            </button>
          </div>
        </form>
      </div>
    );
  }
}
