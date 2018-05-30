import React, { StatelessComponent } from 'react';
import RideCreation from '../components/rider/RideCreation';
import { connect } from 'react-redux';
import AppState from '../typings/AppState';
import RideDetails from '../typings/RideDetails';
import ActiveRide from '../components/rider/ActiveRide';
import { Redirect } from 'react-router';

const Ride: StatelessComponent<{ activeRide: RideDetails; activeDrive: RideDetails }> = ({
  activeRide,
  activeDrive
}) => {
  if (activeDrive) {
    return <Redirect to="/drive" />;
  }
  return activeRide ? <ActiveRide /> : <RideCreation />;
};

export default connect((state: AppState) => ({
  activeRide: state.activeRide,
  activeDrive: state.activeDrive
}))(Ride);
