import React, { Component } from 'react';
import center from '../../styles/center';
import getWaitingRides from '../../api/getWaitingRides';
import getUser from '../../api/getUser';
import { TransitionGroup, Loader } from 'semantic-ui-react';
import RideCard from './RideCard';
import UserRide from '../../typings/UserRide';
import RideDetails from '../../typings/RideDetails';

class RidesList extends Component {
  state: { userRides: UserRide[]; ridesLoaded: boolean } = {
    userRides: [],
    ridesLoaded: false
  };

  getUserRides = async () => {
    const { data: waitingRides } = await getWaitingRides();
    return Promise.all(waitingRides.map(async (ride: RideDetails) => ({
      ride,
      user: (await getUser(ride.riderId)).data
    })) as UserRide[]);
  };

  componentDidMount() {
    this.getUserRides().then(userRides =>
      this.setState({ userRides, ridesLoaded: true })
    );
  }

  render() {
    const { userRides, ridesLoaded } = this.state;
    return (
      <TransitionGroup
        animation="horizontal flip"
        style={{ ...center, width: '100%', marginTop: '1rem' }}
      >
        {ridesLoaded ? (
          userRides.length !== 0 ? (
            userRides.map((userRide: UserRide) => (
              <RideCard key={userRide.ride.id} userRide={userRide} />
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
