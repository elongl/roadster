import React, { ComponentType, StatelessComponent } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import AppState from '../typings/AppState';

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
const mapStateToProps = (state: AppState) => ({ user: state.user });
export default connect(mapStateToProps)(AuthRoute);
