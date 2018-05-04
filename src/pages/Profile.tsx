import React from 'react';
import UserDetails from '../typing/UserDetails';
import AppState from '../typing/AppState';
import { connect } from 'react-redux';
import { Image } from 'semantic-ui-react';

const Profile: React.StatelessComponent<{
  user: UserDetails | null;
}> = props => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      height: '100vh'
    }}
  >
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
