import { Action } from 'redux';
import UserDetails from '../typing/UserDetails';

const serializeUser = (user: UserDetails) => ({
  type: 'SERIALIZE_USER',
  user
});

const deserializeUser = () => ({
  type: 'DESERIALIZE_USER'
});

interface UserAction extends Action {
  user: UserDetails;
}

export { serializeUser, deserializeUser, UserAction };
