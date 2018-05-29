import request from '../request';
import RideDetails from '../../typings/RideDetails';

const getUserRide = async (userId: number) => {
  try {
    return (await request.get(`/userride/${userId}`)).data;
  } catch (ex) {
    return null;
  }
};

export default getUserRide as (userId: number) => Promise<RideDetails>;
