import request from './request';
const getUser = () =>
  request
    .get('/auth/user', { withCredentials: true })
    .then(({ data: user }) => user, () => null);
export default getUser;
