import { Action } from 'redux';
import UserRide from '../typings/UserRide';

const setWaitingRides = (waitingRides: UserRide[]) => ({
  type: 'SET_WAITING_RIDES',
  waitingRides
});

interface RideAction extends Action {
  waitingRides: UserRide[];
}

export { setWaitingRides, RideAction };
