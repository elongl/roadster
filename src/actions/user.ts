import { Action } from 'redux';
import UserDetails from '../types/UserDetails';

const loginUser = (user: UserDetails) => ({ type: 'USER_LOGIN', user });
const updateUser = (user: Partial<UserDetails>) => ({ type: 'UPDATE_USER', user });
const logoutUser = () => ({ type: 'USER_LOGOUT' });

interface UserAction extends Action {
  user: UserDetails;
}

export { updateUser, loginUser, logoutUser, UserAction };
