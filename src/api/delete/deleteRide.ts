import request from '../request';
const deleteRide = async () => {
  await request.delete('/ride');
};
export default deleteRide;
