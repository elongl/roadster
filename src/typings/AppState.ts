import UserDetails from './UserDetails';
import UserRide from './UserRide';
import RideDetails from './RideDetails';

interface AppState {
  user: UserDetails | null;
  waitingRides: UserRide[] | null;
  fallbackError: { error: Error; type: string } | null;
  userLocation: string | null;
  activeRide: RideDetails | null;
  activeDrive: RideDetails | null;
}
export default AppState;
