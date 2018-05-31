import request from '../request';

const completeRide = async () => {
  await request.patch('/completeride');
};
export default completeRide;
