import { Action, Reducer } from 'redux';
import UserDetails from '../typing/UserDetails';

const user: Reducer<null | UserDetails, UserAction> = (state = null, action) => {
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

interface UserAction extends Action {
  user: UserDetails;
}
