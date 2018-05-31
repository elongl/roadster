import request from '../request';

const logout = async () => {
  await request.get('/auth/logout');
};

export default logout;
