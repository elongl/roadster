import React, { Component } from 'react';
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
  InfoWindow
} from 'react-google-maps';
import { clientError } from '../../actions/fallbackError';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

class DirectionsMap extends Component<{
  origin: string | google.maps.LatLng;
  pickup?: string;
  destination: string;
  clientError: typeof clientError;
  fallback?: () => void;
}> {
  state: { directions: google.maps.DirectionsResult | undefined } = {
    directions: undefined
  };

  componentDidMount() {
    const DirectionsService = new google.maps.DirectionsService();
    const { origin, pickup, destination } = this.props;

    let route: google.maps.DirectionsRequest = {
      origin,

      destination,
      travelMode: google.maps.TravelMode.DRIVING
    };
    if (pickup) {
      route.waypoints = [{ location: pickup, stopover: true }];
    }
    DirectionsService.route(route, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.setState({ directions: result });
      } else {
        if (this.props.fallback) {
          this.props.fallback();
        } else {
          this.props.clientError(new Error('Failed to load map.'));
        }
      }
    });
  }

  render() {
    const { directions } = this.state;

    return (
      <GoogleMap
        defaultZoom={17}
        options={{ gestureHandling: 'greedy', mapTypeControl: false }}
      >
        <DirectionsRenderer directions={this.state.directions} />
        {directions &&
          directions.routes[0].legs.map(leg => (
            <InfoWindow
              key={leg.start_address}
              position={leg.steps[Math.floor(leg.steps.length / 2)].start_location}
            >
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
          ))}
      </GoogleMap>
    );
  }
}

export default connect(undefined, { clientError })(withGoogleMap(DirectionsMap));
