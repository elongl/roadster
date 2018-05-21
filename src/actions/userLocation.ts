import { Action } from 'redux';

const setUserLocation = (coordinates: Coordinates) => ({
  type: 'SET_USER_LOCATION',
  coordinates
});

interface UserLocationAction extends Action {
  coordinates: Coordinates;
}

export { setUserLocation, UserLocationAction };
