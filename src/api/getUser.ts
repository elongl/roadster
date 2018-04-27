import UserDetails from '../ORM/UserDetails';
import axios from 'axios';

const getUser = async (): Promise<UserDetails | undefined> => {
  try {
    const { data: user } = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/auth/user`,
      { withCredentials: true }
    );
    return user;
  } catch (err) {
    console.error(err);
    return undefined;
  }
};
export default getUser;
