import request from '../request';
import RideDetails from '../../typings/RideDetails';

const getUserDrive = async () => {
  try {
    const { data: userDrive } = await request.get('/userdrive');
    return userDrive;
  } catch (ex) {
    return null;
  }
};

export default getUserDrive as () => Promise<RideDetails>;
