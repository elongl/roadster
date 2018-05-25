import { Action } from 'redux';

const setUserLocation = (location: string) => ({
  type: 'SET_USER_LOCATION',
  location
});

interface UserLocationAction extends Action {
  location: string;
}

export { setUserLocation, UserLocationAction };
