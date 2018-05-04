import getUser from './api/getUser';
import store from './store';

const appStart = async () => {
  const user = await getUser();
  if (user) {
    store.dispatch({ type: 'SERIALIZE_USER', user });
  }
};
export default appStart;
