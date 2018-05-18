import React, { StatelessComponent } from 'react';
import Registration from '../components/authentication/Registration';
import { connect } from 'react-redux';
import AppState from '../typings/AppState';
import Introduction from '../components/authentication/Introduction';
import TransitionRedirect from '../components/routing/TransitionRedirect';

const Login: StatelessComponent<{ user: AppState['user'] }> = ({ user }) => {
  if (user && (user.isDriver === null || user.phoneNumber === null)) {
    return <Registration />;
  }
  if (user) {
    return <TransitionRedirect to="/" />;
  }
  return <Introduction />;
};

const mapStateToProps = (state: AppState) => ({ user: state.user });
export default connect(mapStateToProps)(Login);
