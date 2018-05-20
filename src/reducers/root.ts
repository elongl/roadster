import { combineReducers } from 'redux';
import fallbackError from './fallbackError';
import user from './user';
export default combineReducers({ user, fallbackError });
