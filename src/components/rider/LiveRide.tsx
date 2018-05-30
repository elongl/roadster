import React, { StatelessComponent } from 'react';
import viewportCenter from '../../styles/viewportCenter';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import MessageLoader from '../common/MessageLoader';
import UserDetails from '../../typings/UserDetails';
import RideDetails from '../../typings/RideDetails';

const LiveRide: StatelessComponent<{
  completeRide: () => void;
  driver: UserDetails | null;
  ride: RideDetails | null;
}> = ({ completeRide, driver, ride }) =>
  !driver || !ride ? (
    <MessageLoader>Loading your driver.</MessageLoader>
  ) : (
    <div
      style={{
        ...viewportCenter,
        color: 'white',
        textAlign: 'center',
        lineHeight: '0.75rem'
      }}
    >
      <h2 style={{ margin: '1rem' }}>{driver.displayName} is on his way towards you!</h2>
      <div style={{ width: '85%' }}>
        <h3>
          He will be waiting for you at{' '}
          <span style={{ fontStyle: 'italic' }}>{ride.origin}</span> and will take you to{' '}
          <span style={{ fontStyle: 'italic' }}>{ride.destination}</span>.
          <span style={{ display: 'block', marginTop: '1.2rem' }}>
            🏎️ Thank you for choosing Roadster 🚗
          </span>
        </h3>
      </div>
      <Button
        positive
        size="big"
        icon="checkmark"
        content="Ride Completed!"
        labelPosition="right"
        as={Link}
        to="/"
        style={{ marginTop: '1.5rem', width: '70%' }}
        onClick={() => completeRide()}
      />
    </div>
  );

export default LiveRide;
