import React, { Component } from 'react';
import RideCard from './RideCard';
import center from '../../styles/center';
import getWaitingRides from '../../api/getWaitingRides';
import getUser from '../../api/getUser';
import RideDetails from '../../typings/RideDetails';
import UserDetails from '../../typings/UserDetails';
import Loader from '../common/Loader';

class RidesList extends Component<{}, { rides: DetailedRide[]; ridesLoaded: boolean }> {
  state = { rides: [], ridesLoaded: false };

  getDetailedRides = async () => {
    const { data: waitingRides } = await getWaitingRides();
    return Promise.all(waitingRides.map(async (ride: RideDetails) => ({
      ...ride,
      user: (await getUser(ride.riderId)).data
    })) as DetailedRide[]);
  };

  componentDidMount() {
    this.getDetailedRides().then(rides => this.setState({ rides, ridesLoaded: true }));
  }

  render() {
    const { rides, ridesLoaded } = this.state;
    return (
      <div style={{ ...center, marginTop: '1rem' }}>
        {ridesLoaded ? (
          rides.length !== 0 ? (
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
            <h1 style={{ marginTop: '3rem', color: 'white', fontStyle: 'italic' }}>
              No rides needed!
            </h1>
          )
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
