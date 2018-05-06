import React, { ComponentType, StatelessComponent } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import AppState from '../typings/AppState';

const LoggedUserRoute: StatelessComponent<
  RouteProps & {
    component: ComponentType;
    user: AppState['user'];
  }
> = ({ user, component: LoggedUserComponent, ...routeProps }) => {
  const userLoggedIn = user && user.isDriver && user.phoneNumber;
  return (
    <Route
      {...routeProps}
      render={() => (userLoggedIn ? <LoggedUserComponent /> : <Redirect to="/login" />)}
    />
  );
};
const mapStateToProps = (state: AppState) => ({ user: state.user });
export default connect(mapStateToProps)(LoggedUserRoute);
