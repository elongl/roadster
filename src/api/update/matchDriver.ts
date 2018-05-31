import request from '../request';

const matchDriver = async (rideId: number) => {
  await request.patch('/matchdriver', { rideId });
};

export default matchDriver;
