import request from '../request';
import RideDetails from '../../typings/RideDetails';

const addRide = async (ride: Partial<RideDetails>) => {
  return (await request.post('/ride', ride)).data.id;
};
export default addRide as (ride: Partial<RideDetails>) => Promise<number>;
