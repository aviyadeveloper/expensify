import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "normalize.css/normalize.css";
import "./styles/styles.scss";

interface IDashboardPageProps {}

const DashboardPage: React.SFC<IDashboardPageProps> = props => (
  <h1>Expensify Dahsboard page</h1>
);

interface IAddExpensePageProps {}

const AddExpensePage: React.SFC<IAddExpensePageProps> = props => (
  <h1>Expensify add expense page</h1>
);

interface IEditExpensePageProps {}

const EditExpensePage: React.SFC<IEditExpensePageProps> = props => (
  <h1>Expensify edit expense page</h1>
);

interface IHelpPageProps {}

const HelpPage: React.SFC<IHelpPageProps> = props => (
  <h1>Expensify help page</h1>
);

interface INotFoundPageProps {}

const NotFoundPage: React.SFC<INotFoundPageProps> = props => <h1>404!</h1>;

const router = (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={DashboardPage} exact={true} />
      <Route path="/add" component={AddExpensePage} />
      <Route path="/edit" component={EditExpensePage} />
      <Route path="/help" component={HelpPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(router, document.getElementById("myApp"));
