import request from './request';
const getUser = (id: number) => request.get(`user/${id}`);
export default getUser;
