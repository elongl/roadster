import React, { ComponentType, StatelessComponent } from 'react';
import { connect } from 'react-redux';
import { Route, RouteProps } from 'react-router-dom';
import AppState from '../../typings/AppState';
import TransitionRedirect from './TransitionRedirect';

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
      render={() =>
        isUserAuthenticated ? <AuthComponent /> : <TransitionRedirect to="/login" />
      }
    />
  );
};
const mapStateToProps = (state: AppState) => ({ user: state.user });
export default connect(mapStateToProps)(AuthRoute);
