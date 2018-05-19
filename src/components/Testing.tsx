import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
const MyMapComponent = withGoogleMap(() => (
  <GoogleMap defaultZoom={17} defaultCenter={{ lat: 32.0036931, lng: 34.94083599999999 }}>
    <Marker position={{ lat: 32.0036931, lng: 34.94083599999999 }} />
    <Marker position={{ lat: 32.0036931, lng: 35.94083599999999 }} />
  </GoogleMap>
));
export default MyMapComponent;
