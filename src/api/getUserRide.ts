import request from './request';
import RideDetails from '../typings/RideDetails';

const getUserRide = async (userId: number) =>
  (await request.get(`/userride/${userId}`)).data;
export default getUserRide as (rideId: number) => Promise<RideDetails>;
