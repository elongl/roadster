import getUser from './api/getUser';
import store from './store';

const appStart = async () => {
  store.subscribe(() => console.log(store.getState()));
  const user = await getUser();
  if (user) {
    store.dispatch({ type: 'SERIALIZE_USER', user });
  }
};
export default appStart;
