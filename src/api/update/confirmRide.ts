import request from '../request';

const confirmRide = async () => {
  await request.post('/confirm');
};
export default confirmRide as () => Promise<void>;
