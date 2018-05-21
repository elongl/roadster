import AppState from '../typings/AppState';
import { UserLocationAction } from '../actions/userLocation';

const user = (state: AppState['userLocation'] = null, action: UserLocationAction) => {
  switch (action.type) {
    case 'SET_USER_LOCATION':
      return action.coordinates;
    default:
      return state;
  }
};

export default user;
