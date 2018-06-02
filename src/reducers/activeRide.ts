import AppState from '../types/AppState';
import { ActiveRideAction } from '../actions/activeRide';
import { Reducer } from 'redux';

const activeRide: Reducer<AppState['activeRide'], ActiveRideAction> = (
  state = null,
  action
) => {
  switch (action.type) {
    case 'SET_ACTIVE_RIDE':
      return action.ride;
    case 'REMOVE_ACTIVE_RIDE':
      return null;
    default:
      return state;
  }
};

export default activeRide;
