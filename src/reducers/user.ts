import AppState from '../types/AppState';
import { UserAction } from '../actions/user';

const user = (state: AppState['user'] = null, action: UserAction) => {
  switch (action.type) {
    case 'SERIALIZE_USER':
      return action.user;
    case 'DESERIALIZE_USER':
      return null;
    default:
      return state;
  }
};

export default user;
