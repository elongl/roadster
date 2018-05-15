import request from './request';
import UserDetails from '../typings/UserDetails';
const updateUser = (changedProperties: Partial<UserDetails>) =>
  request.patch('/user', changedProperties);
export default updateUser;
