import getSessionUser from './api/read/getSessionUser';
import store from './store';
import { loginUser } from './actions/user';
import getUserRide from './api/read/getUserRide';
import { setActiveRide } from './actions/activeRide';
import getUserDrive from './api/read/getUserDrive';
import { setActiveDrive } from './actions/activeDrive';

const appStart = async () => {
  const user = await getSessionUser();
  if (user) {
    store.dispatch(loginUser(user));
    const activeRide = await getUserRide(user.id);
    if (activeRide) {
      store.dispatch(setActiveRide(activeRide));
    } else {
      const activeDrive = await getUserDrive();
      if (activeDrive) {
        store.dispatch(setActiveDrive(activeDrive));
      }
    }
  }
};
export default appStart;
