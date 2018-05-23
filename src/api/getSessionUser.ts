import request from './request';
const getSessionUser = async () => {
  try {
    const { data: user } = await request.get('/auth/user');
    return user;
  } catch (err) {
    if (!err.response) {
      throw err;
    }
    return null;
  }
};
export default getSessionUser;
