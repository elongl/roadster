import AppState from '../typings/AppState';
import { UserAction } from '../actions/user';
import { Reducer } from 'redux';

const user: Reducer<AppState['user'], UserAction> = (state = null, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      return action.user;
    case 'USER_LOGOUT':
      return null;
    default:
      return state;
  }
};

export default user;
