import React, { StatelessComponent } from 'react';
import UserDetails from '../../typings/UserDetails';
import MessageLoader from '../common/MessageLoader';
import { Image, Button } from 'semantic-ui-react';
import viewportCenter from '../../styles/viewportCenter';
import { Link } from 'react-router-dom';
const DriverFound: StatelessComponent<{
  driver: UserDetails | null;
  deleteRide: () => void;
}> = ({ driver, deleteRide }) => {
  if (!driver) {
    return <MessageLoader>Loading your Driver.</MessageLoader>;
  }
  return (
    <div style={{ ...viewportCenter, color: 'white', textAlign: 'center' }}>
      <Image circular size="small" src={driver.avatar} height={150} />
      <strong style={{ fontStyle: 'italic', fontSize: '1.5rem', margin: '1.5rem' }}>
        {driver.displayName} wants to pick you up!
      </strong>
      <p style={{ fontSize: '1.25rem' }}>
        To contact {driver.displayName}:
        <a
          style={{ color: 'lightblue', display: 'block' }}
          href={`tel: ${driver.phoneNumber}`}
        >
          {driver.phoneNumber}.
        </a>
        <span style={{ marginTop: '1rem' }}>(Click To Call)</span>
      </p>

      <Button
        color="green"
        size="large"
        style={{ width: '60%', marginTop: '1rem' }}
        icon="marker"
        content="Pick me up!"
      />
      <Button
        as={Link}
        color="google plus"
        to="/"
        size="large"
        style={{ width: '60%', marginTop: '0.5rem' }}
        icon="cancel"
        content="Nevermind, cancel."
        onClick={deleteRide}
      />
    </div>
  );
};

export default DriverFound;
