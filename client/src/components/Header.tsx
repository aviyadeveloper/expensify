import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { NavLink, Link } from 'react-router-dom';
import { runLogout } from '../actions/auth';

interface IHeaderProps extends RouteComponentProps {
  runLogout?: () => void;
}

export const Header: React.SFC<IHeaderProps> = props => (
  <header className="navbar">
    <Link className="navbar__title-link-container" to="/dashboard">
      <h1 className="navbar__app-title">Expensify</h1>
    </Link>
    <div className="navbar__links-container">
      <NavLink
        activeClassName="active-link"
        className="navbar__links-container__link"
        to="/help"
      >
        Help
      </NavLink>
      <button
        id="logout-button"
        className="navbar__links-container__link buttons__clear"
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
