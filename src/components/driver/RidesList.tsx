import React, { Component } from 'react';
import center from '../../styles/center';
import getWaitingRides from '../../api/getWaitingRides';
import getUser from '../../api/getUser';
import { TransitionGroup, Loader } from 'semantic-ui-react';
import RideCard from './RideCard';
import RideWithUser from '../../typings/RideWithUser';
import RideDetails from '../../typings/RideDetails';

class RidesList extends Component {
  state: { rides: RideWithUser[]; ridesLoaded: boolean } = {
    rides: [],
    ridesLoaded: false
  };

  getDetailedRides = async () => {
    const { data: waitingRides } = await getWaitingRides();
    return Promise.all(waitingRides.map(async (ride: RideDetails) => ({
      ...ride,
      user: (await getUser(ride.riderId)).data
    })) as RideWithUser[]);
  };

  componentDidMount() {
    this.getDetailedRides().then(rides => this.setState({ rides, ridesLoaded: true }));
  }
  selectRide = (rideId: number) => {
    // Do something with ride.
  };

  render() {
    const { rides, ridesLoaded } = this.state;
    return (
      <TransitionGroup
        animation="horizontal flip"
        style={{ ...center, width: '100%', marginTop: '1rem' }}
      >
        {ridesLoaded ? (
          rides.length !== 0 ? (
            rides.map((ride: RideWithUser) => (
              <RideCard key={ride.id} ride={ride} onClick={this.selectRide} />
            ))
          ) : (
            <h1 style={{ marginTop: '3rem', color: 'white', fontStyle: 'italic' }}>
              No rides needed!
            </h1>
          )
        ) : (
          <Loader />
        )}
      </TransitionGroup>
    );
  }
}

export default RidesList;
