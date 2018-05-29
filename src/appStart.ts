import getSessionUser from './api/read/getSessionUser';
import store from './store';
import { loginUser } from './actions/user';
import getUserRide from './api/read/getUserRide';
import { setActiveRide } from './actions/activeRide';

const appStart = async () => {
  const user = await getSessionUser();
  if (user) {
    store.dispatch(loginUser(user));
    const userRide = await getUserRide(user.id);
    if (userRide) {
      store.dispatch(setActiveRide(userRide));
    }
  }
};
export default appStart;
