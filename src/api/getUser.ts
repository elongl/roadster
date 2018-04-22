import UserDetails from '../ORM/UserDetails';
import axios from 'axios';

export default async function getUser(): Promise<UserDetails> {
  const { data } = await axios.get(
    `${process.env.REACT_APP_SERVER_URL}/auth/user`,
    { withCredentials: true }
  );
  const user: UserDetails = data;
  return user;
}
