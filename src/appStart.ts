import getSessionUser from './api/read/getSessionUser';
import store from './store';
import { loginUser } from './actions/user';
import getUserRide from './api/read/getUserRide';
import { setActiveRide } from './actions/activeRide';
import socket from './api/socket';

const appStart = async () => {
  const user = await getSessionUser();
  if (user) {
    store.dispatch(loginUser(user));
    const activeRide = await getUserRide(user.id);
    if (activeRide) {
      store.dispatch(setActiveRide(activeRide));
      if (!activeRide.driverId) {
        socket.on(`matchdriver/${activeRide.id}`, async () => {
          const activeRideWithDriver = await getUserRide(user.id);
          store.dispatch(setActiveRide(activeRideWithDriver));
        });
      }
    }
  }
};
export default appStart;
