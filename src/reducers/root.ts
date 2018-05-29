import { combineReducers } from 'redux';
import fallbackError from './fallbackError';
import user from './user';
import waitingRides from './waitingRides';
import userLocation from './userLocation';
import activeRide from './activeRide';

export default combineReducers({
  waitingRides,
  user,
  fallbackError,
  userLocation,
  activeRide
});
