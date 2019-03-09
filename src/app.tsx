import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import "normalize.css/normalize.css";
import "./styles/styles.scss";

interface IDashboardPageProps {}

const DashboardPage: React.SFC<IDashboardPageProps> = props => (
  <h2>Expensify Dahsboard page</h2>
);

interface IAddExpensePageProps {}

const AddExpensePage: React.SFC<IAddExpensePageProps> = props => (
  <h2>Expensify add expense page</h2>
);

interface IEditExpensePageProps {}

const EditExpensePage: React.SFC<IEditExpensePageProps> = props => (
  <h2>Expensify edit expense page</h2>
);

interface IHelpPageProps {}

const HelpPage: React.SFC<IHelpPageProps> = props => (
  <h2>Expensify help page</h2>
);

interface INotFoundPageProps {}

const NotFoundPage: React.SFC<INotFoundPageProps> = props => <h2>404!</h2>;

interface IHeaderProps {}

const Header: React.SFC<IHeaderProps> = props => (
  <header className="navbar">
    <h1 className="navbar__app-title">Expensify</h1>
    <div className="navbar__links-container">
      <NavLink
        activeClassName="active-link"
        className="navbar__links-container__link"
        to="/"
        exact={true}
      >
        Dashboard
      </NavLink>
      <NavLink
        activeClassName="active-link"
        className="navbar__links-container__link"
        to="/add"
      >
        Add Expense
      </NavLink>
      <NavLink
        activeClassName="active-link"
        className="navbar__links-container__link"
        to="/edit"
      >
        Edit Expense
      </NavLink>
      <NavLink
        activeClassName="active-link"
        className="navbar__links-container__link"
        to="/help"
      >
        Help
      </NavLink>
    </div>
  </header>
);
const router = (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={DashboardPage} exact={true} />
        <Route path="/add" component={AddExpensePage} />
        <Route path="/edit" component={EditExpensePage} />
        <Route path="/help" component={HelpPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

ReactDOM.render(router, document.getElementById("myApp"));
