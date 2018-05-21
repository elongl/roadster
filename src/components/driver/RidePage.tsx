import React, { Component } from 'react';
import request from '../../api/request';
import { RouteComponentProps } from 'react-router-dom';
import UserRide from '../../typings/UserRide';
import SidebarTitle from '../common/SidebarTitle';
import { Segment, Button, Loader, Dimmer } from 'semantic-ui-react';
import center from '../../styles/center';
import DirectionsMap from '../maps/DirectionsMap';
import { clientError } from '../../actions/fallbackError';
import { connect } from 'react-redux';
import { Action } from 'redux';
import AppState from '../../typings/AppState';
import { setUserLocation } from '../../actions/userLocation';

class RidePage extends Component<
  {
    onClientError: (error: Error) => void;
    setUserLocation: (coordinates: Coordinates) => void;
    userLocation: Coordinates | null;
  } & RouteComponentProps<{ rideId: number }>
> {
  state: { userRide: UserRide | undefined } = { userRide: undefined };

  async componentDidMount() {
    const { rideId } = this.props.match.params;
    try {
      const { data: ride } = await request.get(`/ride/${rideId}`);
      const { data: user } = await request.get(`/user/${ride.riderId}`);
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
      this.props.onClientError(new Error('We were unable to track your location.'));
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
                <Button style={{ width: '50%' }} secondary>
                  Skip
                </Button>
              </Button.Group>
            </>
          ) : (
            <Dimmer active>
              <Loader size="big" indeterminate>
                Tracking Your Location.
              </Loader>
            </Dimmer>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => ({ userLocation: state.userLocation });
const mapDispatchToProps = (dispatch: (action: Action) => void) => ({
  onClientError: (error: Error) => dispatch(clientError(error)),
  setUserLocation: (coordinates: Coordinates) => dispatch(setUserLocation(coordinates))
});
export default connect(mapStateToProps, mapDispatchToProps)(RidePage);
