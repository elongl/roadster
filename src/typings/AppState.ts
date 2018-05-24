import UserDetails from './UserDetails';
import UserRide from './UserRide';

interface AppState {
  user: UserDetails | null;
  waitingRides: UserRide[] | null;
  fallbackError: { error: Error; type: string } | null;
  userLocation: Coordinates | null;
}
export default AppState;
