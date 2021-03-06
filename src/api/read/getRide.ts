import request from '../request';
import RideDetails from '../../types/RideDetails';
const getRide = async (id: number) => (await request.get(`ride/${id}`)).data;
export default getRide as (id: number) => Promise<RideDetails>;
