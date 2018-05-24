import AppState from '../typings/AppState';
import { RideAction } from '../actions/waitingRides';
import { Reducer } from 'redux';

const waitingRides: Reducer<AppState['waitingRides'], RideAction> = (
  state = null,
  action
) => {
  switch (action.type) {
    case 'SET_WAITING_RIDES': {
      return action.waitingRides;
    }
    default:
      return state;
  }
};
export default waitingRides;
