import React, { Component, StatelessComponent } from 'react';
import {
  Segment,
  Header,
  Divider,
  Radio,
  Button,
  Loader,
  Dimmer
} from 'semantic-ui-react';
import PlaceSearchBox from '../maps/PlaceSearchBox';
import center from '../../styles/center';
import StandaloneSearchBox from 'react-google-maps/lib/components/places/StandaloneSearchBox';
import { connect } from 'react-redux';
import AppState from '../../typings/AppState';
import { setUserLocation as setUserLocationAction } from '../../actions/userLocation';
import { clientError as clientErrorAction } from '../../actions/fallbackError';
import DirectionsMap from '../maps/DirectionsMap';
import addRide from '../../api/addRide';

const MessageLoader: StatelessComponent = ({ children }) => (
  <Dimmer active>
    <Loader size="big" inverted indeterminate>
      {children}
    </Loader>
  </Dimmer>
);

class RideForm extends Component<{
  setUserLocation: typeof setUserLocationAction;
  clientError: typeof clientErrorAction;
  userLocation: AppState['userLocation'];
}> {
  state = {
    stage: 1,
    origin: { myLocation: true, value: '' },
    destination: { value: '' }
  };

  textChange = (stateName: string, event: React.SyntheticEvent<HTMLInputElement>) =>
    this.setState({
      [stateName]: {
        ...this.state[stateName],
        value: event.currentTarget.value,
        isPlace: false
      }
    });

  placeChange = (stateName: string, ref: StandaloneSearchBox | null) => {
    const placeName =
      ref && ref.getPlaces()[0]
        ? ref.getPlaces()[0].formatted_address
        : this.state[stateName].value;

    this.setState({
      [stateName]: {
        value: placeName,
        isPlace: true
      }
    });
  };

  pushStage = () => this.setState({ stage: this.state.stage + 1 });

  componentDidUpdate() {
    const { stage, origin, destination } = this.state;
    const geocoder = new google.maps.Geocoder();
    const { userLocation, setUserLocation, clientError } = this.props;

    if (stage === 2) {
      try {
        if (!userLocation) {
          navigator.geolocation.getCurrentPosition(({ coords }) =>
            setUserLocation(coords)
          );
        }
      } catch (err) {
        clientError(new Error('We were unable to track your location.'));
      }
    }

    if (stage === 3) {
      if (!origin.myLocation) {
        addRide({ origin: origin.value, destination: destination.value });
      } else {
        if (userLocation) {
          geocoder.geocode(
            {
              location: new google.maps.LatLng(
                userLocation.latitude,
                userLocation.longitude
              )
            },
            (result, status) => {
              if (status === google.maps.GeocoderStatus.OK) {
                addRide({
                  origin: result[0].formatted_address,
                  destination: destination.value
                }).then(() => this.pushStage());
              } else {
                clientError(new Error('We were unable to track your location.'));
              }
            }
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
          <Segment raised style={{ marginTop: '1rem', width: '85%', ...center }}>
            <Header>Where shall we pick you up</Header>
            <Radio
              toggle
              label="My Location"
              style={{ marginBottom: '1rem' }}
              checked={origin.myLocation}
              onChange={() => {
                this.setState({
                  origin: {
                    ...origin,
                    myLocation: !origin.myLocation
                  }
                });
              }}
            />
            {!origin.myLocation && (
              <PlaceSearchBox
                icon="anchor"
                placeholder="Choose starting point."
                value={origin.value}
                onChange={event => this.textChange('origin', event)}
                onPlacesChanged={ref => this.placeChange('origin', ref)}
              />
            )}

            <Divider style={{ width: '90%' }} />
            <Header style={{ marginTop: 0 }}>Where would you like to go</Header>

            <PlaceSearchBox
              icon="location arrow"
              placeholder="Choose destination."
              value={destination.value}
              onChange={event => this.textChange('destination', event)}
              onPlacesChanged={ref => this.placeChange('destination', ref)}
            />

            <Button
              primary
              size="large"
              content="Find a Driver"
              style={{ marginTop: '1rem', width: '75%' }}
              onClick={() => this.pushStage()}
            />
          </Segment>
        )}
        {stage === 2 && (
          <>
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
                <strong>From: </strong> {origin.myLocation ? 'My Location' : origin.value}
              </span>

              <span style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>To: </strong> {destination.value}
              </span>
            </Segment>

            {userLocation ? (
              <>
                <DirectionsMap
                  fallback={() => {
                    alert('We were unable to load your map. Please review your inputs.');
                    this.setState({ stage: 1 });
                  }}
                  containerElement={<div style={{ height: '60vh', width: '90%' }} />}
                  mapElement={<div style={{ height: '100%', borderRadius: '1rem' }} />}
                  destination={destination.value}
                  origin={
                    origin.myLocation
                      ? new google.maps.LatLng(
                          userLocation.latitude,
                          userLocation.longitude
                        )
                      : origin.value
                  }
                />
                <Button.Group size="large" style={{ width: '85%', margin: '1rem' }}>
                  <Button
                    primary
                    style={{ width: '50%' }}
                    onClick={() => this.pushStage()}
                  >
                    Go!
                  </Button>
                  <Button.Or style={{ textTransform: 'uppercase' }} />
                  <Button
                    secondary
                    style={{ width: '50%' }}
                    onClick={() => this.setState({ stage: 1 })}
                  >
                    Edit
                  </Button>
                </Button.Group>
              </>
            ) : (
              <MessageLoader>Tracking Your Location.</MessageLoader>
            )}
          </>
        )}
        {stage === 3 && <MessageLoader>Creating your ride.</MessageLoader>}
        {stage === 4 && (
          <div style={{ marginTop: '15rem', color: 'white', textAlign: 'center' }}>
            <h2 style={{ margin: '0.5rem' }}>The driver hunt has began!</h2>
            <h3 style={{ margin: 0, fontStyle: 'italic' }}>
              You will be notified once we find a driver.
              <span style={{ display: 'block' }}>
                (You can close the app in the meanwhile.)
              </span>
            </h3>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({ userLocation: state.userLocation });
export default connect(mapStateToProps, {
  setUserLocation: setUserLocationAction,
  clientError: clientErrorAction
})(RideForm);
