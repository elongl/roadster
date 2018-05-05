import { combineReducers } from 'redux';
import networkError from './networkError';
import user from './user';
export default combineReducers({ user, networkError });
