import React, { StatelessComponent } from 'react';
import viewportCenter from '../../styles/viewportCenter';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
const WaitingForDriver: StatelessComponent<{ deleteRide: () => void }> = ({
  deleteRide
}) => (
  <div style={{ ...viewportCenter, color: 'white' }}>
    <h2 style={{ margin: '0.5rem' }}>The driver hunt has begun!</h2>
    <h3 style={{ margin: 0, fontStyle: 'italic' }}>
      You will be notified once we find a driver.
      <span style={{ display: 'block' }}>(You can close the app in the meanwhile)</span>
    </h3>
    <Button
      size="big"
      icon="cancel"
      color="youtube"
      content="Cancel Ride"
      labelPosition="right"
      as={Link}
      to="/"
      style={{ marginTop: '1.5rem', width: '70%' }}
      onClick={deleteRide}
    />
  </div>
);

export default WaitingForDriver;
