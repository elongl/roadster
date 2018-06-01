import React, { Component } from 'react';
import viewportCenter from '../../styles/viewportCenter';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import MessageLoader from '../common/MessageLoader';
import UserDetails from '../../typings/UserDetails';
import RideDetails from '../../typings/RideDetails';
import socket from '../../api/socket';
import { connect } from 'react-redux';
import { removeActiveDrive as removeActiveDriveAction } from '../../actions/activeDrive';

class LiveDrive extends Component<{
  completeRide: () => void;
  rider: UserDetails | null;
  ride: RideDetails;
  removeActiveDrive: typeof removeActiveDriveAction;
}> {
  componentDidMount() {
    const { ride, removeActiveDrive } = this.props;
    socket.once(`complete/${ride.id}`, removeActiveDrive);
  }
  render() {
    const { ride, rider, completeRide } = this.props;
    return !rider || !ride ? (
      <MessageLoader>Loading your hitchhiker.</MessageLoader>
    ) : (
      <div
        style={{
          ...viewportCenter,
          color: 'white',
          textAlign: 'center',
          lineHeight: '0.75rem'
        }}
      >
        <h2 style={{ margin: '1rem' }}>{rider.displayName} is waiting for you!</h2>
        <div style={{ width: '85%' }}>
          <h3>
            Go to <span style={{ fontStyle: 'italic' }}>{ride.origin}</span> to pick him
            up.
            <br />
            From there head to{' '}
            <span style={{ fontStyle: 'italic' }}>{ride.destination}</span>
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
          onClick={completeRide}
        />
      </div>
    );
  }
}

export default connect(undefined, { removeActiveDrive: removeActiveDriveAction })(
  LiveDrive
);
