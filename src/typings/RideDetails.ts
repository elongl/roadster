export default interface RideDetails {
  id: number;
  riderId: number;
  driverId: number | null;
  origin: string;
  destination: string;
  status: string;
}
