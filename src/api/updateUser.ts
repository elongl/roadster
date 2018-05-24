import request from './request';
import UserDetails from '../typings/UserDetails';
const updateUser = async (changedProperties: Partial<UserDetails>) => {
  await request.patch('/user', changedProperties);
};
export default updateUser as (changedProperties: Partial<UserDetails>) => Promise<void>;
