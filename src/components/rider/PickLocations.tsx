import React, { StatelessComponent } from 'react';
import StandaloneSearchBox from 'react-google-maps/lib/components/places/StandaloneSearchBox';
import { Segment, Header, Radio, Divider, Button, Form } from 'semantic-ui-react';
import PlaceSearchBox from '../maps/PlaceSearchBox';
import center from '../../styles/center';

interface PickLocations {
  origin: { value: string; myLocation: boolean };
  destination: { value: string };
  textChange: (state: string, newText: string) => void;
  placeChange: (state: string, ref: StandaloneSearchBox | null) => void;
  myLocationToggle: () => void;
  pushStage: () => void;
}

const PickLocations: StatelessComponent<PickLocations> = ({
  origin,
  destination,
  textChange,
  placeChange,
  myLocationToggle,
  pushStage
}) => (
  <Segment raised style={{ width: '85%', margin: '2rem' }}>
    <Form
      style={center}
      onSubmit={() => {
        if ((origin.value || origin.myLocation) && destination.value) {
          pushStage();
        }
      }}
    >
      <Header>Where shall we pick you up</Header>
      <Radio
        toggle
        label="My Location"
        style={{ marginBottom: '1rem', zIndex: 0 }}
        checked={origin.myLocation}
        onChange={() => myLocationToggle()}
      />
      {!origin.myLocation && (
        <PlaceSearchBox
          icon="anchor"
          placeholder="Choose starting point."
          value={origin.value}
          onChange={event => textChange('origin', event.currentTarget.value)}
          onPlacesChanged={ref => placeChange('origin', ref)}
        />
      )}

      <Divider style={{ width: '90%' }} />
      <Header style={{ marginTop: 0 }}>Where would you like to go</Header>

      <PlaceSearchBox
        icon="location arrow"
        placeholder="Choose destination."
        value={destination.value}
        onChange={event => textChange('destination', event.currentTarget.value)}
        onPlacesChanged={ref => placeChange('destination', ref)}
      />

      <Button
        primary
        type="submit"
        size="large"
        content="Find a Driver"
        style={{ marginTop: '1rem', width: '75%' }}
      />
    </Form>
  </Segment>
);

export default PickLocations;
