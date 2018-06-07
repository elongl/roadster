import React, { StatelessComponent } from 'react';
import viewportCenter from '../../styles/viewportCenter';
import { Image, Button } from 'semantic-ui-react';
import UserDetails from '../../types/UserDetails';

const ProfileViewMode: StatelessComponent<{
  user: UserDetails;
  switchMode: () => void;
}> = ({ user, switchMode }) => (
  <>
    <Button
      icon="edit"
      content="Edit"
      style={{ position: 'absolute', right: '1.5rem', top: '1.5rem' }}
      onClick={switchMode}
    />
    <div style={{ ...viewportCenter, color: 'white' }}>
      <Image circular size="small" style={{ height: 150 }} src={user.avatar} />
      <h2>Display Name</h2>
      <span>{user.displayName}</span>
      <h2>Phone number</h2>
      <span>{user.phoneNumber || 'Unknown'}</span>
      <h2>Driver</h2>
      <span>{user.isDriver ? 'Yes' : 'No'}</span>
    </div>
  </>
);

export default ProfileViewMode;
