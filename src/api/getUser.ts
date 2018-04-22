import UserDetails from '../ORM/UserDetails';
import apiSyntax from '../utils/apiSyntax';
import axios from 'axios';

const getUser = async (): Promise<UserDetails> => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_SERVER_URL}/auth/user`,
    { withCredentials: true }
  );
  const user: UserDetails = data;
  return apiSyntax(user);
};
export default getUser;
