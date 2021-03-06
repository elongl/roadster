import React, { Component } from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import SidebarTitle from '../common/SidebarTitle';
import { Segment, Button, Loader, Dimmer } from 'semantic-ui-react';
import center from '../../styles/center';
import DirectionsMap from '../maps/DirectionsMap';
import { connect } from 'react-redux';
import AppState from '../../types/AppState';
import { clientError as clientErrorAction } from '../../actions/fallbackError';
import { setUserLocation as setUserLocationAction } from '../../actions/userLocation';
import getUserLocation from '../../utils/getUserLocation';
import matchDriver from '../../api/update/matchDriver';
import { setActiveDrive as setActiveDriveAction } from '../../actions/activeDrive';

class RidePage extends Component<
  {
    clientError: typeof clientErrorAction;
    setUserLocation: typeof setUserLocationAction;
    setActiveDrive: typeof setActiveDriveAction;
    userLocation: AppState['userLocation'];
    waitingRides: AppState['waitingRides'];
    userId: number;
  } & RouteComponentProps<{ rideId: number }>
> {
  state = { loading: true, locationRejected: false };
  componentDidMount() {
    const { setUserLocation, userLocation } = this.props;
    if (!userLocation) {
      getUserLocation(
        loc => {
          setUserLocation(loc);
          this.setState({ loading: false });
        },
        err => {
          this.setState({ locationRejected: true, loading: false });
        }
      );
    }
  }

  render() {
    const {
      waitingRides,
      userLocation,
      match,
      history,
      setActiveDrive,
      userId
    } = this.props;
    const { locationRejected, loading } = this.state;
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

          {!loading ? (
            <>
              {locationRejected ? (
                <DirectionsMap
                  containerElement={<div style={{ height: '57.5vh', width: '90%' }} />}
                  mapElement={<div style={{ height: '100%', borderRadius: '1rem' }} />}
                  origin={ride.origin}
                  destination={ride.destination}
                />
              ) : (
                userLocation && (
                  <DirectionsMap
                    containerElement={<div style={{ height: '57.5vh', width: '90%' }} />}
                    mapElement={<div style={{ height: '100%', borderRadius: '1rem' }} />}
                    origin={userLocation}
                    pickup={ride.origin}
                    destination={ride.destination}
                  />
                )
              )}
              <Button.Group size="large" style={{ width: '85%', margin: '1rem' }}>
                <Button
                  style={{ width: '50%' }}
                  color="orange"
                  onClick={() => {
                    matchDriver(match.params.rideId).then(() =>
                      setActiveDrive({ ...ride, driverId: userId, status: 'confirming' })
                    );
                  }}
                >
                  Let's Roll!
                </Button>
                <Button.Or style={{ textTransform: 'uppercase' }} />
                <Button
                  secondary
                  style={{ width: '50%' }}
                  onClick={() => history.push('/drive')}
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
    waitingRides: state.waitingRides,
    userId: state.user && state.user.id
  }),
  {
    clientError: clientErrorAction,
    setUserLocation: setUserLocationAction,
    setActiveDrive: setActiveDriveAction
  }
)(RidePage);
