import React, { StatelessComponent } from 'react';
import PhoneAndDriver from '../components/PhoneAndDriver';
import { connect } from 'react-redux';
import AppState from '../typing/AppState';
import LoginForm from '../components/LoginForm';

const Login: StatelessComponent<{ user: AppState['user'] }> = ({ user }) => {
  if (user && (user.isDriver === null || user.phoneNumber === null)) {
    return <PhoneAndDriver />;
  }
  return <LoginForm />;
};

const mapStateToProps = (state: AppState) => ({ user: state.user });
export default connect(mapStateToProps)(Login);
