import request from './request';
import UserDetails from '../typings/UserDetails';
const getUser = async (id: number) => (await request.get(`user/${id}`)).data;
export default getUser as (id: number) => Promise<UserDetails>;
