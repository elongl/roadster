import { UserAction } from '../actions/user';
import UserDetails from '../typing/UserDetails';

const user = (state: UserDetails | null = null, action: UserAction) => {
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
