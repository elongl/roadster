import React, { Component } from 'react';
import center from '../styles/center';
import StandaloneSearchBox from 'react-google-maps/lib/components/places/StandaloneSearchBox';
import { connect } from 'react-redux';
import AppState from '../typings/AppState';
import { setUserLocation as setUserLocationAction } from '../actions/userLocation';
import { clientError as clientErrorAction } from '../actions/fallbackError';
import addRide from '../api/addRide';
import PickLocations from '../components/rider/PickLocations';
import RideConfirmation from '../components/rider/RideConfirmation';
import WaitingForDriver from '../components/rider/WaitingForDriver';
import MessageLoader from '../components/common/MessageLoader';
import getUserLocation from '../utils/getUserLocation';
import SidebarTitle from '../components/common/SidebarTitle';
import DriverFound from '../components/rider/DriverFound';

class Ride extends Component<{
  setUserLocation: typeof setUserLocationAction;
  clientError: typeof clientErrorAction;
  userLocation: AppState['userLocation'];
}> {
  state = {
    stage: 1,
    origin: { myLocation: true, value: '' },
    destination: { value: '' }
  };

  textChange = (stateName: string, value: string) =>
    this.setState({
      [stateName]: {
        ...this.state[stateName],
        value
      }
    });

  myLocationToggle = () => {
    const { origin } = this.state;
    this.setState({
      origin: { ...origin, myLocation: !origin.myLocation }
    });
  };

  placeChange = (stateName: string, ref: StandaloneSearchBox | null) => {
    const placeName =
      ref && ref.getPlaces()[0]
        ? ref.getPlaces()[0].formatted_address
        : this.state[stateName].value;

    this.setState({
      [stateName]: {
        value: placeName
      }
    });
  };

  pushStage = () => this.setState({ stage: this.state.stage + 1 });
  gotoStage = (stage: number) => this.setState({ stage });

  componentDidUpdate() {
    const { stage, origin, destination } = this.state;
    const { userLocation, setUserLocation, clientError } = this.props;

    if (stage === 2 && origin.myLocation) {
      if (!userLocation) {
        getUserLocation(loc => setUserLocation(loc), err => clientError(err));
      }
    } else if (stage === 3) {
      if (!origin.myLocation) {
        addRide({ origin: origin.value, destination: destination.value }).then(() =>
          this.pushStage()
        );
      } else {
        if (userLocation) {
          addRide({ origin: userLocation, destination: destination.value }).then(() =>
            this.pushStage()
          );
        }
      }
    } else if (stage === 4) {
      console.log('Stage 4');
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
              textChange={(state, text) => this.textChange(state, text)}
              placeChange={(state, text) => this.placeChange(state, text)}
              myLocationToggle={() => this.myLocationToggle()}
              pushStage={() => this.pushStage()}
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
          {stage === 4 && <WaitingForDriver />}
          {stage === 5 && <DriverFound />}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => ({ userLocation: state.userLocation });
export default connect(mapStateToProps, {
  setUserLocation: setUserLocationAction,
  clientError: clientErrorAction
})(Ride);
