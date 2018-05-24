import React, { Component } from 'react';
import { Segment, Header, Divider } from 'semantic-ui-react';
import StandaloneSearchBox from 'react-google-maps/lib/components/places/StandaloneSearchBox';
import PlaceSearchBox from '../maps/PlaceSearchBox';
import center from '../../styles/center';

class RideForm extends Component {
  state = {
    origin: { value: '', isPlace: false },
    destination: { value: '', isPlace: false }
  };

  textChange = (stateName: string, event: React.SyntheticEvent<HTMLInputElement>) =>
    this.setState({
      [stateName]: { value: event.currentTarget.value, isPlace: false }
    });

  placeChange = (stateName: string, ref: StandaloneSearchBox | null) =>
    this.setState({
      [stateName]: {
        value: ref && ref.getPlaces()[0].formatted_address,
        isPlace: true
      }
    });

  render() {
    return (
      <div style={center}>
        <Segment raised style={{ marginTop: '1rem', width: '85%', ...center }}>
          <Header>Where shall we pick you up?</Header>

          <PlaceSearchBox
            icon="anchor"
            placeholder="Choose starting point."
            value={this.state.origin.value}
            onChange={event => this.textChange('origin', event)}
            onPlacesChanged={ref => this.placeChange('origin', ref)}
          />

          <Divider style={{ width: '90%' }} />
          <Header style={{ marginTop: 0 }}>Where would you like to go?</Header>

          <PlaceSearchBox
            icon="location arrow"
            placeholder="Choose destination."
            value={this.state.destination.value}
            onChange={event => this.textChange('destination', event)}
            onPlacesChanged={ref => this.placeChange('destination', ref)}
          />
        </Segment>
      </div>
    );
  }
}
export default RideForm;
