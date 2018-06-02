import { Action } from 'redux';
import UserRide from '../types/UserRide';

const setWaitingRides = (waitingRides: UserRide[]) => ({
  type: 'SET_WAITING_RIDES',
  waitingRides
});

interface RideAction extends Action {
  waitingRides: UserRide[];
}

export { setWaitingRides, RideAction };
