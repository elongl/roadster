import Location from './Location';
export default interface RideDetails {
  id: number;
  riderId: number;
  driverId: number;
  startPoint: Location;
  endPoint: Location;
  status: string;
}
