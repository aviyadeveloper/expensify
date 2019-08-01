import React from 'react';
import { runLogin } from '../actions/auth';
import { connect } from 'react-redux';

export const LoginPage = ({ runLogin }: { runLogin: any }) => (
  <div className="layout__background">
    <div className="layout__card login__card">
      <h1 className="layout__card__title">Expensify</h1>
      <p className="layout__card__subtitle">Track your expenses easily</p>
      <button id="login-button" className="buttons__button" onClick={runLogin}>
        Login
      </button>
    </div>
  </div>
);

const mapDispatchToProps = (dispatch: any) => ({
  runLogin: () => {
    dispatch(runLogin());
  }
});

export default connect(
  undefined,
  mapDispatchToProps
)(LoginPage);
