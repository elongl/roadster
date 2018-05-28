import React, { ComponentType, StatelessComponent } from 'react';
import { connect } from 'react-redux';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import AppState from '../../typings/AppState';

const AuthRoute: StatelessComponent<
  RouteProps & {
    component: ComponentType;
    user: AppState['user'];
  }
> = ({ user, component: AuthComponent, ...routeProps }) => {
  const isUserAuthenticated = user && user.isDriver !== null && user.phoneNumber !== null;
  return (
    <Route
      {...routeProps}
      render={() => (isUserAuthenticated ? <AuthComponent /> : <Redirect to="/login" />)}
    />
  );
};
export default connect((state: AppState) => ({ user: state.user }))(AuthRoute);
