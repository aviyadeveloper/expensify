import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { AppRouter } from "./routers/AppRouter";
import configureStore from "./store/configureStore";

import "normalize.css/normalize.css";
import "./styles/styles.scss";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

import { addExpense } from "./actions/expensesActions";
import { sortByAmount } from "./actions/filtersActions";
import moment = require("moment");

const store = configureStore();
store.dispatch(
  addExpense({
    name: "Water Bill",
    amount: 1000,
    description: "June 2010",
    createdAt: moment()
  })
);
store.dispatch(
  addExpense({
    name: "Gas Bill",
    amount: 2000,
    description: "June 2010",
    createdAt: moment()
  })
);

store.dispatch(
  addExpense({
    name: "Ice Cream",
    amount: 200,
    description: "Tasty",
    createdAt: moment()
  })
);

store.dispatch(sortByAmount());

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
ReactDOM.render(jsx, document.getElementById("myApp"));
