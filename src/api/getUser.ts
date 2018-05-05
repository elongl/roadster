import request from './request';

const getUser = async () => {
  try {
    const { data: user } = await request.get('/auth/user', { withCredentials: true });
    return user;
  } catch (err) {
    return null;
  }
};
export default getUser;
