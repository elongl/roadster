import { Action } from 'redux';
import RideDetails from '../typings/RideDetails';

const setActiveDrive = (ride: RideDetails) => ({
  type: 'SET_ACTIVE_DRIVE',
  ride
});

const removeActiveDrive = () => ({ type: 'REMOVE_ACTIVE_DRIVE' });

interface ActiveDriveAction extends Action {
  ride: RideDetails;
}

export { setActiveDrive, removeActiveDrive, ActiveDriveAction };
