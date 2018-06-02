import request from '../request';
import RideDetails from '../../types/RideDetails';
const getWaitingRides = async () => (await request.get('/waitingrides')).data;
export default getWaitingRides as () => Promise<RideDetails[]>;
