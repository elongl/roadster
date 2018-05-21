import UserDetails from './UserDetails';

interface AppState {
  user: UserDetails | null;
  fallbackError: { error: Error; type: string } | null;
  userLocation: Coordinates | null;
}
export default AppState;
