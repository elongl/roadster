import React, { Component } from 'react';
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
  InfoWindow
} from 'react-google-maps';
import store from '../../store';
import { clientError } from '../../actions/fallbackError';
import { Icon } from 'semantic-ui-react';

class DirectionsMap extends Component<{
  origin: string;
  waypoint: string;
  destination: string;
}> {
  state: { directions: google.maps.DirectionsResult | undefined } = {
    directions: undefined
  };

  componentDidMount() {
    const DirectionsService = new google.maps.DirectionsService();
    const { origin, waypoint, destination } = this.props;
    DirectionsService.route(
      {
        origin,
        waypoints: [{ location: waypoint, stopover: true }],
        destination,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({ directions: result });
        } else {
          store.dispatch(clientError(new Error('Failed to load map.')));
        }
      }
    );
  }

  render() {
    return (
      <GoogleMap defaultZoom={17}>
        <DirectionsRenderer directions={this.state.directions} />
        {this.state.directions &&
          this.state.directions.routes[0].legs.map(
            leg =>
              leg.steps[1] && (
                <InfoWindow position={leg.steps[1].start_location}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Icon name="car" style={{ fontSize: '1.1rem' }} />
                      <h5 style={{ margin: 0, color: 'green' }}>{leg.duration.text}</h5>
                    </div>
                    <strong style={{ margin: 0 }}>{leg.distance.text}</strong>
                  </div>
                </InfoWindow>
              )
          )}
      </GoogleMap>
    );
  }
}

export default withGoogleMap(DirectionsMap);
