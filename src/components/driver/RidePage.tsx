import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import UserRide from '../../typings/UserRide';
import SidebarTitle from '../common/SidebarTitle';
import { Segment, Button, Loader, Dimmer } from 'semantic-ui-react';
import center from '../../styles/center';
import DirectionsMap from '../maps/DirectionsMap';
import { clientError } from '../../actions/fallbackError';
import { connect } from 'react-redux';
import AppState from '../../typings/AppState';
import { setUserLocation } from '../../actions/userLocation';
import getRide from '../../api/getRide';
import getUser from '../../api/getUser';

class RidePage extends Component<
  {
    clientError: typeof clientError;
    setUserLocation: typeof setUserLocation;
    userLocation: Coordinates | null;
  } & RouteComponentProps<{ rideId: number }>
> {
  state: { userRide: UserRide | undefined } = { userRide: undefined };

  async componentDidMount() {
    const { rideId } = this.props.match.params;
    try {
      const ride = await getRide(rideId);
      const user = await getUser(ride.riderId);
      this.setState({ userRide: { ride, user } });
    } catch (err) {
      this.props.history.push('/drive');
    }

    try {
      if (!this.props.userLocation) {
        navigator.geolocation.getCurrentPosition(({ coords }) =>
          this.props.setUserLocation(coords)
        );
      }
    } catch (err) {
      this.props.clientError(new Error('We were unable to track your location.'));
    }
  }

  render() {
    if (!this.state.userRide) {
      return <Loader />;
    }
    const { userLocation } = this.props;
    const { user, ride } = this.state.userRide;

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
                origin={
                  new google.maps.LatLng(userLocation.latitude, userLocation.longitude)
                }
                pickup={ride.origin}
                destination={ride.destination}
              />

              <Button.Group size="large" style={{ width: '85%', marginTop: '1rem' }}>
                <Button style={{ width: '50%' }} color="orange">
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

export default connect((state: AppState) => ({ userLocation: state.userLocation }), {
  clientError,
  setUserLocation
})(RidePage);
