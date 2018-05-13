import React, { StatelessComponent } from 'react';
import viewportCenter from '../styles/viewportCenter';
import { connect } from 'react-redux';
import { Image } from 'semantic-ui-react';
import UserDetails from '../typings/UserDetails';
import AppState from '../typings/AppState';
import SidebarMenu from '../components/SidebarMenu';

const Profile: StatelessComponent<{
  user: UserDetails;
}> = props => (
  <div style={{ ...viewportCenter, color: 'white' }}>
    <>
      <SidebarMenu />
      <Image
        circular
        size="small"
        style={{ height: 150 }}
        src={props.user.avatar.substring(0, props.user.avatar.indexOf('?')) + '?sz=200'}
      />
      <h2>Display Name</h2>
      <span>{props.user.displayName}</span>
      <h2>Phone number</h2>
      <span>{props.user.phoneNumber || 'Unknown'}</span>
      <h2>Driver</h2>
      <span>{props.user.isDriver ? 'Yes' : 'No'}</span>
    </>
  </div>
);
const mapStateToProps = (state: AppState) => ({ user: state.user });
export default connect(mapStateToProps)(Profile);
