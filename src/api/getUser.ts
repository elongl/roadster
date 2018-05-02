import UserDetails from '../typing/UserDetails';
import request from './request';

const getUser = async (): Promise<UserDetails | undefined> => {
  try {
    const { data: user } = await request.get('/auth/user', { withCredentials: true });
    return user;
  } catch (err) {
    console.error(err);
    return undefined;
  }
};
export default getUser;
