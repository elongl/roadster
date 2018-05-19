import RideDetails from './RideDetails';
import UserDetails from './UserDetails';

interface RideWithUser extends RideDetails {
  user: UserDetails;
}
export default RideWithUser;
