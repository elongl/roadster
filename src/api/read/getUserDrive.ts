import request from '../request';
import RideDetails from '../../typings/RideDetails';

const getUserDrive = async () => {
  try {
    return (await request.get('/userdrive')).data;
  } catch (ex) {
    return null;
  }
};

export default getUserDrive as () => Promise<RideDetails>;
