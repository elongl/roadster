import React, { Component } from 'react';
import viewportCenter from '../../styles/viewportCenter';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import MessageLoader from '../common/MessageLoader';
import UserDetails from '../../typings/UserDetails';
import RideDetails from '../../typings/RideDetails';
import socket from '../../api/socket';
import { connect } from 'react-redux';
import { removeActiveRide as removeActiveRideAction } from '../../actions/activeRide';

class LiveRide extends Component<{
  completeRide: () => void;
  driver: UserDetails | null;
  ride: RideDetails;
  removeActiveRide: typeof removeActiveRideAction;
}> {
  componentDidMount() {
    const { ride, removeActiveRide } = this.props;
    socket.once(`complete/${ride.id}`, removeActiveRide);
  }

  render() {
    const { driver, ride, completeRide } = this.props;
    return !driver ? (
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
        <h2 style={{ margin: '1rem' }}>
          {driver.displayName} is on his way towards you!
        </h2>
        <div style={{ width: '85%' }}>
          <h3>
            He will be waiting for you at{' '}
            <span style={{ fontStyle: 'italic' }}>{ride.origin}</span> and will take you
            to <span style={{ fontStyle: 'italic' }}>{ride.destination}</span>.
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

export default connect(undefined, { removeActiveRide: removeActiveRideAction })(LiveRide);