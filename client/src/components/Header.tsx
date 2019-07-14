import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { NavLink } from 'react-router-dom';
import { runLogout } from '../actions/auth';

interface IHeaderProps extends RouteComponentProps {
  runLogout?: () => void;
}

export const Header: React.SFC<IHeaderProps> = props => (
  <header className="navbar">
    <h1 className="navbar__app-title">Expensify</h1>
    <div className="navbar__links-container">
      <NavLink
        activeClassName="active-link"
        className="navbar__links-container__link"
        to="/dashboard"
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
        to="/help"
      >
        Help
      </NavLink>
      <button
        id="logout-button"
        className="navbar__links-container__link"
        onClick={props.runLogout}
      >
        Logout
      </button>
    </div>
  </header>
);

const mapDispatchToProps = (dispatch: Function) => ({
  runLogout: () => {
    dispatch(runLogout());
  }
});

export default withRouter(
  connect(
    undefined,
    mapDispatchToProps
  )(Header)
);
