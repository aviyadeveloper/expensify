import React from 'react';
import { connect } from 'react-redux';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import Header from '../components/Header';

interface privateRoute extends RouteProps {
  isAuthenticated: boolean;
}

const PrivateRoute: React.SFC<privateRoute> = props => {
  if (props.isAuthenticated) {
    return (
      <div>
        <Header />
        <Route {...props} />
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }
};

const mapStateToProps = (state: any) => ({
  isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);
