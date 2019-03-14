import React from "react";
import moment, { Moment } from "moment";
import { SingleDatePicker } from "react-dates";
import { Expense } from "../types/expensesTypes";

import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

type ExpenseFormProps = {
  onSubmit: (expense: Expense) => void;
  name?: string;
  description?: string;
  amount?: number;
  createdAt?: Moment;
  calendarFocused?: boolean | null;
  error?: string;
};

interface ExpenseFormState {
  name: string;
  description: string;
  amount: string;
  createdAt: Moment;
  calendarFocused: boolean | null;
  error: string;
}

export class ExpenseForm extends React.Component<
  ExpenseFormProps,
  ExpenseFormState
> {
  state: ExpenseFormState = {
    name: this.props.name || "",
    description: this.props.description || "",
    amount: (this.props.amount && (this.props.amount / 100).toFixed(2)) || "",
    createdAt:
      (this.props.createdAt && moment(this.props.createdAt)) || moment(),
    calendarFocused: false,
    error: ""
  };
  nameRef = React.createRef<HTMLInputElement>();
  descriptionRef = React.createRef<HTMLTextAreaElement>();
  amountRef = React.createRef<HTMLInputElement>();
  formRef = React.createRef<HTMLFormElement>();

  onNameChange = () => {
    this.setState(() => ({
      name: this.nameRef.current && this.nameRef.current.value
    }));
  };

  onAmountChange = () => {
    let amount = (this.amountRef.current && this.amountRef.current.value) || "";

    // Allow only cent based currency fit number format.
    (amount.match(/^[1-9]\d*(\.\d{0,2})?$/) || !amount) &&
      this.setState(() => ({ amount }));
  };

  onDateChange = (createdAt: Moment | null) => {
    createdAt && this.setState(() => ({ createdAt }));
  };

  onCalendarFocused = ({ focused }: { focused: boolean | null }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };

  onDescriptionChange = () => {
    this.setState(() => ({
      description:
        (this.descriptionRef.current && this.descriptionRef.current.value) || ""
    }));
  };

  onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!this.state.amount || !this.state.name) {
      this.setState(() => ({ error: "Name and amount are required" }));
    } else {
      this.setState(() => ({ error: "" }));
      this.props.onSubmit({
        name: this.state.name,
        amount: parseFloat(this.state.amount) * 100,
        description: this.state.description,
        createdAt: this.state.createdAt
      });
    }
  };

  render() {
    return (
      <div>
        <form ref={this.formRef} onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="name"
            ref={this.nameRef}
            autoFocus
            value={this.state.name}
            onChange={this.onNameChange}
          />
          <input
            type="text"
            placeholder="amount"
            ref={this.amountRef}
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
            ref={this.descriptionRef}
            value={this.state.description}
            onChange={this.onDescriptionChange}
            placeholder="description"
          />
          {this.state.error && <p>{this.state.error}</p>}
          <button>Add</button>
        </form>
      </div>
    );
  }
}
