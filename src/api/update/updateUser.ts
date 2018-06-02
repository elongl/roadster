import request from '../request';
import UserDetails from '../../types/UserDetails';
const updateUser = async (changedProperties: Partial<UserDetails>) => {
  await request.patch('/user', changedProperties);
};
export default updateUser;
