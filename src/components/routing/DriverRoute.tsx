import React, { ComponentType, StatelessComponent } from 'react';
import { connect } from 'react-redux';
import { RouteProps, Route, Redirect } from 'react-router-dom';
import AppState from '../../types/AppState';

const DriverRoute: StatelessComponent<
  RouteProps & {
    component: ComponentType;
    user: AppState['user'];
  }
> = ({ user, component: DriverComponent, ...routeProps }) => {
  const isUserDriver = user && user.isDriver;
  return (
    <Route
      {...routeProps}
      render={() => (isUserDriver ? <DriverComponent /> : <Redirect to="/" />)}
    />
  );
};
export default connect((state: AppState) => ({ user: state.user }))(DriverRoute);
