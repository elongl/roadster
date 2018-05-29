import { Action } from 'redux';
import RideDetails from '../typings/RideDetails';

const setActiveRide = (ride: RideDetails) => ({
  type: 'SET_ACTIVE_RIDE',
  ride
});

const removeActiveRide = () => ({ type: 'REMOVE_ACTIVE_RIDE' });

interface ActiveRideAction extends Action {
  ride: RideDetails;
}

export { setActiveRide, removeActiveRide, ActiveRideAction };
