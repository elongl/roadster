import UserDetails from './UserDetails';

interface AppState {
  user: UserDetails | null;
  networkError: Error | null;
}
export default AppState;
