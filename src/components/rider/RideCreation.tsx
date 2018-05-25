import React, { Component } from 'react';
import center from '../../styles/center';
import StandaloneSearchBox from 'react-google-maps/lib/components/places/StandaloneSearchBox';
import { connect } from 'react-redux';
import AppState from '../../typings/AppState';
import { setUserLocation as setUserLocationAction } from '../../actions/userLocation';
import { clientError as clientErrorAction } from '../../actions/fallbackError';
import addRide from '../../api/addRide';
import PickLocations from './PickLocations';
import RideConfirmation from './RideConfirmation';
import WaitingForDriver from './WaitingForDriver';
import MessageLoader from '../common/MessageLoader';
import getUserLocation from '../../utils/getUserLocation';

class RideCreation extends Component<{
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
    }

    if (stage === 3) {
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
    }
  }

  render() {
    const { stage, origin, destination } = this.state;
    const { userLocation } = this.props;
    return (
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
        {stage === 3 && <MessageLoader>Creating your ride.</MessageLoader>}
        {stage === 4 && <WaitingForDriver />}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({ userLocation: state.userLocation });
export default connect(mapStateToProps, {
  setUserLocation: setUserLocationAction,
  clientError: clientErrorAction
})(RideCreation);
