import React, { Component } from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import SidebarTitle from '../common/SidebarTitle';
import { Segment, Button, Loader, Dimmer } from 'semantic-ui-react';
import center from '../../styles/center';
import DirectionsMap from '../maps/DirectionsMap';
import { connect } from 'react-redux';
import AppState from '../../typings/AppState';
import { clientError as clientErrorAction } from '../../actions/fallbackError';
import { setUserLocation as setUserLocationAction } from '../../actions/userLocation';
import getUserLocation from '../../utils/getUserLocation';
import matchDriver from '../../api/update/matchDriver';

class RidePage extends Component<
  {
    clientError: typeof clientErrorAction;
    setUserLocation: typeof setUserLocationAction;
    userLocation: AppState['userLocation'];
    waitingRides: AppState['waitingRides'];
  } & RouteComponentProps<{ rideId: number }>
> {
  componentDidMount() {
    const { setUserLocation, userLocation, clientError } = this.props;
    if (!userLocation) {
      getUserLocation(loc => setUserLocation(loc), err => clientError(err));
    }
  }

  render() {
    const { waitingRides, userLocation } = this.props;
    if (!waitingRides) {
      return <Loader />;
    }
    const thisRide = waitingRides.find(
      waitingRide => waitingRide.ride.id === Number(this.props.match.params.rideId)
    );
    if (!thisRide) {
      return <Redirect to="/drive" />;
    }
    const { user, ride } = thisRide;
    return (
      <>
        <SidebarTitle title={user.displayName} />
        <div style={center}>
          <Segment
            raised
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: '1.25rem',
              width: '85%',
              marginTop: '1rem'
            }}
          >
            <span style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>Origin: </strong> {ride.origin}
            </span>
            <span style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>Destination: </strong> {ride.destination}
            </span>
          </Segment>

          {userLocation ? (
            <>
              <DirectionsMap
                containerElement={<div style={{ height: '60vh', width: '90%' }} />}
                mapElement={<div style={{ height: '100%', borderRadius: '1rem' }} />}
                origin={userLocation}
                pickup={ride.origin}
                destination={ride.destination}
              />

              <Button.Group size="large" style={{ width: '85%', margin: '1rem' }}>
                <Button
                  style={{ width: '50%' }}
                  color="orange"
                  onClick={() => matchDriver(this.props.match.params.rideId)}
                >
                  Let's Roll!
                </Button>
                <Button.Or style={{ textTransform: 'uppercase' }} />
                <Button
                  secondary
                  style={{ width: '50%' }}
                  onClick={() => this.props.history.push('/drive')}
                >
                  Skip
                </Button>
              </Button.Group>
            </>
          ) : (
            <Dimmer active>
              <Loader size="big" inverted indeterminate>
                Tracking Your Location.
              </Loader>
            </Dimmer>
          )}
        </div>
      </>
    );
  }
}

export default connect(
  (state: AppState) => ({
    userLocation: state.userLocation,
    waitingRides: state.waitingRides
  }),
  {
    clientError: clientErrorAction,
    setUserLocation: setUserLocationAction
  }
)(RidePage);
