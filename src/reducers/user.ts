import AppState from '../typings/AppState';
import { UserAction } from '../actions/user';
import { Reducer } from 'redux';

const user: Reducer<AppState['user'], UserAction> = (state = null, action) => {
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
