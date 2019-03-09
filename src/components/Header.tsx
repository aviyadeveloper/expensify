import React from "react";
import { NavLink } from "react-router-dom";

interface IHeaderProps {}

export const Header: React.SFC<IHeaderProps> = props => (
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
