import React, { StatelessComponent } from 'react';
import Registration from '../components/Registration';
import { connect } from 'react-redux';
import AppState from '../typings/AppState';
import Introduction from '../components/Introduction';

const Login: StatelessComponent<{ user: AppState['user'] }> = ({ user }) => {
  if (user && (user.isDriver === null || user.phoneNumber === null)) {
    return <Registration user={user} />;
  }
  return <Introduction />;
};

const mapStateToProps = (state: AppState) => ({ user: state.user });
export default connect(mapStateToProps)(Login);
