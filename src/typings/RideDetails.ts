import Location from './Location';
export default interface RideDetails {
  id: number;
  riderId: number;
  driverId: number;
  origin: Location;
  destination: Location;
  status: string;
}
