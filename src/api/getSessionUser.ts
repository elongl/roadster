import request from './request';
const getUser = () =>
  request.get('/auth/user').then(
    ({ data: user }) => user,
    error => {
      if (!error.response) {
        return Promise.reject(error);
      }
      return Promise.resolve(null);
    }
  );
export default getUser;
