import getSessionUser from './api/getSessionUser';
import store from './store';
import { serializeUser } from './actions/user';
import getUserRide from './api/getUserRide';
import { setActiveRide } from './actions/activeRide';

const appStart = async () => {
  const user = await getSessionUser();
  if (user) {
    store.dispatch(serializeUser(user));
    const userRide = await getUserRide(user.id);
    store.dispatch(setActiveRide(userRide));
  }
};
export default appStart;
