import React from 'react';
import { runLogin } from '../actions/auth';
import { connect } from 'react-redux';

export const LoginPage = ({ runLogin }: { runLogin: any }) => (
  <div>
    <button id="login-button" onClick={runLogin}>
      Login
    </button>
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
