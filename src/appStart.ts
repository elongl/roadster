import getSessionUser from './api/getSessionUser';
import store from './store';
import { serializeUser } from './actions/user';

const appStart = async () => {
  await getSessionUser().then(
    user => user !== null && store.dispatch(serializeUser(user))
  );
};
export default appStart;
