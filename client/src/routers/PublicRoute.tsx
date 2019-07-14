import React from 'react';
import { connect } from 'react-redux';
import { Route, RouteProps, Redirect } from 'react-router-dom';

interface PublicRoute extends RouteProps {
  isAuthenticated: boolean;
}

const PublicRoute: React.SFC<PublicRoute> = props => {
  if (!props.isAuthenticated) {
    return (
      <div>
        <Route {...props} />
      </div>
    );
  } else {
    return <Redirect to="/dashboard" />;
  }
};

const mapStateToProps = (state: any) => ({
  isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PublicRoute);
