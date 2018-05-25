import request from './request';
import RideDetails from '../typings/RideDetails';

const addRide = async (ride: Partial<RideDetails>) => {
  await request.post('/ride', ride);
};
export default addRide as (ride: Partial<RideDetails>) => Promise<void>;
