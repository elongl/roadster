const getUserLocation = (
  callback: (location: string) => void,
  err?: (error: Error) => void
) => {
  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode(
        { location: new google.maps.LatLng(coords.latitude, coords.longitude) },
        (result, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            callback(result[0].formatted_address);
          } else if (err) {
            err(new Error('We were unable to track your location.'));
          }
        }
      );
    },
    error => {
      if (err) {
        err(new Error(error.message));
      }
    }
  );
};

export default getUserLocation;
