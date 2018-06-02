import request from '../request';
import RideDetails from '../../types/RideDetails';

const getUserRide = async (userId: number) => {
  try {
    const { data: userRide } = await request.get(`/userride/${userId}`);
    return userRide;
  } catch (ex) {
    return null;
  }
};

export default getUserRide as (userId: number) => Promise<RideDetails>;
