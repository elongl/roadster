import React, { Component } from 'react';
import center from '../../styles/center';
import getWaitingRides from '../../api/getWaitingRides';
import getUser from '../../api/getUser';
import { TransitionGroup, Loader } from 'semantic-ui-react';
import RideCard from './RideCard';
import UserRide from '../../typings/UserRide';
import RideDetails from '../../typings/RideDetails';
import { connect } from 'react-redux';
import AppState from '../../typings/AppState';
import { setWaitingRides } from '../../actions/waitingRides';

class RidesList extends Component<{
  waitingRides: AppState['waitingRides'];
  setWaitingRides: typeof setWaitingRides;
}> {
  setWaitingRides = async () => {
    const waitingRides = await getWaitingRides();
    const userRides = await Promise.all(
      waitingRides.map(async (ride: RideDetails) => ({
        ride,
        user: await getUser(ride.riderId)
      }))
    );
    this.props.setWaitingRides(userRides);
  };

  componentDidMount() {
    this.setWaitingRides();
  }

  render() {
    const userRides = this.props.waitingRides;
    return (
      <TransitionGroup
        animation="scale"
        style={{ ...center, width: '100%', marginTop: '1rem' }}
      >
        {userRides ? (
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
          <Loader inverted />
        )}
      </TransitionGroup>
    );
  }
}

const mapStateToProps = (state: AppState) => ({ waitingRides: state.waitingRides });
export default connect(mapStateToProps, { setWaitingRides })(RidesList);
