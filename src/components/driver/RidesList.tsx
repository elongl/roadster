import React, { StatelessComponent } from 'react';
import center from '../../styles/center';
import { TransitionGroup, Loader } from 'semantic-ui-react';
import RideCard from './RideCard';
import UserRide from '../../types/UserRide';
import { connect } from 'react-redux';
import AppState from '../../types/AppState';

const RidesList: StatelessComponent<{
  waitingRides: AppState['waitingRides'];
}> = ({ waitingRides }) => (
  <TransitionGroup
    animation="fade down"
    style={{ ...center, width: '100%', marginTop: '1rem' }}
  >
    {waitingRides ? (
      waitingRides.length !== 0 ? (
        waitingRides.map((userRide: UserRide) => (
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

const mapStateToProps = (state: AppState) => ({ waitingRides: state.waitingRides });
export default connect(mapStateToProps)(RidesList);
