import { combineReducers } from 'redux';
import fallbackError from './fallbackError';
import user from './user';
import userLocation from './userLocation';
export default combineReducers({ user, fallbackError, userLocation });
