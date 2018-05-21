import AppState from '../typings/AppState';
import { UserLocationAction } from '../actions/userLocation';
import { Reducer } from 'redux';

const user: Reducer<AppState['userLocation'], UserLocationAction> = (
  state = null,
  action
) => {
  switch (action.type) {
    case 'SET_USER_LOCATION':
      return action.coordinates;
    default:
      return state;
  }
};

export default user;
