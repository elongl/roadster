import React, { StatelessComponent } from 'react';
import { connect } from 'react-redux';
import viewportCenter from '../styles/viewportCenter';
import AppState from '../typings/AppState';
import { withRouter, RouteComponentProps } from 'react-router-dom';
const Home: StatelessComponent<
  {
    user: AppState['user'];
  } & RouteComponentProps<{}>
> = props => {
  if (!props.user) {
    props.history.push('/login');
  }
  return (
    <div style={viewportCenter}>
      <h1>This is the Homepage.</h1>
    </div>
  );
};
const mapStateToProps = (state: AppState) => ({ user: state.user });
export default connect(mapStateToProps)(withRouter(Home));
