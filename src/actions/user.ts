import { Action } from 'redux';
import UserDetails from '../types/UserDetails';

const loginUser = (user: UserDetails) => ({
  type: 'USER_LOGIN',
  user
});

const logoutUser = () => ({
  type: 'USER_LOGOUT'
});

interface UserAction extends Action {
  user: UserDetails;
}

export { loginUser, logoutUser, UserAction };
