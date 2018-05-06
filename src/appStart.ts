import getUser from './api/getUser';
import store from './store';
import { serializeUser } from './actions/user';

const appStart = async () => {
  await getUser().then(user => user !== null && store.dispatch(serializeUser(user)));
};
export default appStart;
