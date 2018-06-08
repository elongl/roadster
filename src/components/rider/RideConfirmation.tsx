import React, { StatelessComponent } from 'react';
import DirectionsMap from '../maps/DirectionsMap';
import { Segment, Button } from 'semantic-ui-react';
import AppState from '../../types/AppState';
import MessageLoader from '../common/MessageLoader';

const RideConfirmation: StatelessComponent<{
  origin: { value: string; myLocation: boolean };
  destination: { value: string };
  userLocation: AppState['userLocation'];
  gotoStage: (stage: number) => void;
  pushStage: () => void;
}> = ({ origin, destination, userLocation, gotoStage, pushStage }) => (
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
        <strong>From: </strong> {origin.myLocation ? userLocation : origin.value}
      </span>

      <span style={{ display: 'flex', justifyContent: 'space-between' }}>
        <strong>To: </strong> {destination.value}
      </span>
    </Segment>

    {(origin.myLocation && userLocation) || !origin.myLocation ? (
      <>
        <DirectionsMap
          fallback={() => {
            alert('We were unable to load your map. Please review your inputs.');
            gotoStage(1);
          }}
          containerElement={<div style={{ height: '57.5vh', width: '90%' }} />}
          mapElement={<div style={{ height: '100%', borderRadius: '1rem' }} />}
          destination={destination.value}
          origin={origin.myLocation && userLocation ? userLocation : origin.value}
        />
        <Button.Group size="large" style={{ width: '85%', margin: '1rem' }}>
          <Button primary style={{ width: '50%' }} onClick={pushStage}>
            Go!
          </Button>
          <Button.Or style={{ textTransform: 'uppercase' }} />
          <Button secondary style={{ width: '50%' }} onClick={() => gotoStage(1)}>
            Edit
          </Button>
        </Button.Group>
      </>
    ) : (
      <MessageLoader>Tracking Your Location.</MessageLoader>
    )}
  </>
);

export default RideConfirmation;
