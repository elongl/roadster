import React, { Component } from 'react';
import viewportCenter from '../../styles/viewportCenter';
import { Button } from 'semantic-ui-react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import MessageLoader from '../common/MessageLoader';
import UserDetails from '../../types/UserDetails';
import RideDetails from '../../types/RideDetails';
import socket from '../../api/socket';
import { connect } from 'react-redux';
import { removeActiveDrive as removeActiveDriveAction } from '../../actions/activeDrive';

class LiveDrive extends Component<
  RouteComponentProps<{}> & {
    completeRide: () => void;
    rider: UserDetails | null;
    ride: RideDetails;
    removeActiveDrive: typeof removeActiveDriveAction;
  }
> {
  componentDidMount() {
    const { ride, removeActiveDrive, history } = this.props;
    socket.once(`complete/${ride.id}`, () => {
      removeActiveDrive();
      history.push('/');
    });
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
          size="big"
          content="Get Directions"
          icon="map"
          labelPosition="right"
          style={{ marginTop: '1.5rem', width: '70%' }}
          onClick={() =>
            location.replace(
              `https://www.google.com/maps/dir/?api=1&waypoints=${
                ride.origin
              }&destination=${ride.destination}`
            )
          }
        />
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

export default withRouter(
  connect(
    undefined,
    { removeActiveDrive: removeActiveDriveAction }
  )(LiveDrive)
);
