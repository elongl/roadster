import request from '../request';

const unmatchDriver = async () => {
  await request.patch('/unmatchdriver');
};

export default unmatchDriver;
