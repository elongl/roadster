import request from './request';
import UserDetails from '../typings/UserDetails';
const updateUser = (userId: number, changedProperties: Partial<UserDetails>) =>
  request.patch('/user', {
    id: userId,
    changedProperties
  });
export default updateUser;
