import React, { Component } from 'react';
import center from '../../styles/center';
import StandaloneSearchBox from 'react-google-maps/lib/components/places/StandaloneSearchBox';
import { connect } from 'react-redux';
import AppState from '../../typings/AppState';
import { setUserLocation as setUserLocationAction } from '../../actions/userLocation';
import { clientError as clientErrorAction } from '../../actions/fallbackError';
import { setActiveRide as setActiveRideAction } from '../../actions/activeRide';
import addRide from '../../api/create/addRide';
import PickLocations from '../../components/rider/PickLocations';
import RideConfirmation from '../../components/rider/RideConfirmation';
import MessageLoader from '../../components/common/MessageLoader';
import getUserLocation from '../../utils/getUserLocation';
import SidebarTitle from '../../components/common/SidebarTitle';
import UserDetails from '../../typings/UserDetails';

class RideCreation extends Component<{
  setUserLocation: typeof setUserLocationAction;
  setActiveRide: typeof setActiveRideAction;
  clientError: typeof clientErrorAction;
  userLocation: AppState['userLocation'];
  user: UserDetails;
}> {
  state = {
    stage: 1,
    origin: { myLocation: true, value: '' },
    destination: { value: '' }
  };

  textChange = (stateName: string, value: string) =>
    this.setState({
      [stateName]: { ...this.state[stateName], value }
    });

  myLocationToggle = () => {
    const { origin } = this.state;
    this.setState({ origin: { ...origin, myLocation: !origin.myLocation } });
  };

  placeChange = (stateName: string, ref: StandaloneSearchBox | null) => {
    const place = ref && ref.getPlaces()[0];
    const placeName = place ? place.formatted_address : this.state[stateName].value;
    this.setState({ [stateName]: { ...this.state[stateName], value: placeName } });
  };

  pushStage = () => this.setState({ stage: this.state.stage + 1 });
  gotoStage = (stage: number) => this.setState({ stage });

  async componentDidUpdate() {
    const { stage, origin, destination } = this.state;
    const {
      userLocation,
      setUserLocation,
      setActiveRide,
      clientError,
      user
    } = this.props;

    if (stage === 2 && origin.myLocation) {
      if (!userLocation) {
        getUserLocation(loc => setUserLocation(loc), err => clientError(err));
      }
    } else if (stage === 3) {
      const chosenOrigin =
        origin.myLocation && userLocation ? userLocation : origin.value;
      try {
        const id = await addRide({
          origin: chosenOrigin,
          destination: destination.value
        });
        setActiveRide({
          id,
          origin: chosenOrigin,
          destination: destination.value,
          riderId: user.id,
          driverId: null,
          status: 'waiting'
        });
      } catch (ex) {
        clientError(new Error('Failed to create new ride.'));
      }
    }
  }

  render() {
    const { stage, origin, destination } = this.state;
    const { userLocation } = this.props;
    return (
      <>
        <SidebarTitle title="Pick a destination." />
        <div style={center}>
          {stage === 1 && (
            <PickLocations
              origin={origin}
              destination={destination}
              textChange={this.textChange}
              placeChange={this.placeChange}
              myLocationToggle={this.myLocationToggle}
              pushStage={this.pushStage}
            />
          )}
          {stage === 2 && (
            <RideConfirmation
              origin={origin}
              destination={destination}
              gotoStage={this.gotoStage}
              pushStage={this.pushStage}
              userLocation={userLocation}
            />
          )}
          {stage === 3 && <MessageLoader>Creating your Ride.</MessageLoader>}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  user: state.user,
  userLocation: state.userLocation
});
export default connect(mapStateToProps, {
  setUserLocation: setUserLocationAction,
  clientError: clientErrorAction,
  setActiveRide: setActiveRideAction
})(RideCreation);
