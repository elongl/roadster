import React, { StatelessComponent } from 'react';
import AppState from '../typings/AppState';
import viewportCenter from '../styles/viewportCenter';
import { connect } from 'react-redux';
import { Image } from 'semantic-ui-react';

const Profile: StatelessComponent<{
  user: AppState['user'];
}> = props => (
  <div style={{ ...viewportCenter, color: 'white' }}>
    {props.user ? (
      <>
        <Image
          circular
          size="small"
          src={props.user.avatar.substring(0, props.user.avatar.indexOf('?')) + '?sz=200'}
        />
        <h2>Display Name</h2>
        <span>{props.user.displayName}</span>
        <h2>Phone number</h2>
        <span>{props.user.phoneNumber || 'Unknown'}</span>
        <h2>Is Driver</h2>
        <span>{props.user.isDriver || 'Unknown'}</span>
      </>
    ) : (
      <h1>Please log in first. </h1>
    )}
  </div>
);

const mapStateToProps = (state: AppState) => ({ user: state.user });
export default connect(mapStateToProps)(Profile);
