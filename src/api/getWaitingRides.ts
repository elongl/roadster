import request from './request';
const getWaitingRides = () => request.get('/waitingrides');
export default getWaitingRides;
