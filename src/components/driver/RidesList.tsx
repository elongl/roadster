import React, { Component } from 'react';
import RideCard from './RideCard';
import center from '../../styles/center';
import getWaitingRides from '../../api/getWaitingRides';
import getUser from '../../api/getUser';
import RideDetails from '../../typings/RideDetails';
import UserDetails from '../../typings/UserDetails';
import Loader from '../common/Loader';

class RidesList extends Component<{}, { rides: DetailedRide[] | undefined }> {
  state: { rides: undefined | DetailedRide[] } = { rides: undefined };

  getDetailedRides = async () => {
    const { data: waitingRides } = await getWaitingRides();
    return Promise.all(waitingRides.map(async (ride: RideDetails) => ({
      ...ride,
      user: (await getUser(ride.riderId)).data
    })) as DetailedRide[]);
  };

  componentDidMount() {
    this.getDetailedRides().then(rides => this.setState({ rides }));
  }

  render() {
    const { rides } = this.state;
    return (
      <div style={{ ...center, marginTop: '1rem' }}>
        {rides ? (
          rides.map((ride: DetailedRide) => (
            <RideCard
              key={ride.id}
              riderName={ride.user.displayName}
              riderAvatar={ride.user.avatar}
              startPoint={ride.startPoint}
              endPoint={ride.endPoint}
            />
          ))
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}

interface DetailedRide extends RideDetails {
  user: UserDetails;
}
export default RidesList;
