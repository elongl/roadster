import AppState from '../typings/AppState';
import { ActiveDriveAction } from '../actions/activeDrive';
import { Reducer } from 'redux';

const activeDrive: Reducer<AppState['activeDrive'], ActiveDriveAction> = (
  state = null,
  action
) => {
  switch (action.type) {
    case 'SET_ACTIVE_DRIVE':
      return action.ride;
    case 'REMOVE_ACTIVE_DRIVE':
      return null;
    default:
      return state;
  }
};

export default activeDrive;
