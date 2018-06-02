import React, { StatelessComponent } from 'react';
import Registration from '../components/authentication/Registration';
import { connect } from 'react-redux';
import AppState from '../types/AppState';
import Introduction from '../components/authentication/Introduction';
import { Redirect } from 'react-router';

const Login: StatelessComponent<{ user: AppState['user'] }> = ({ user }) => {
  if (user && (user.isDriver === null || user.phoneNumber === null)) {
    return <Registration />;
  }
  if (user) {
    return <Redirect to="/" />;
  }
  return <Introduction />;
};

export default connect((state: AppState) => ({ user: state.user }))(Login);
