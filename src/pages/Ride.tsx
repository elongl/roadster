import React, { StatelessComponent } from 'react';
import RideCreation from '../components/rider/RideCreation';
import { connect } from 'react-redux';
import AppState from '../types/AppState';
import ActiveRide from '../components/rider/ActiveRide';
import { Redirect } from 'react-router';

const Ride: StatelessComponent<{ isActiveRide: boolean; isActiveDrive: boolean }> = ({
  isActiveRide,
  isActiveDrive
}) => {
  if (isActiveDrive) {
    return <Redirect to="/drive" />;
  }
  return isActiveRide ? <ActiveRide /> : <RideCreation />;
};

export default connect((state: AppState) => ({
  isActiveRide: Boolean(state.activeRide),
  isActiveDrive: Boolean(state.activeDrive)
}))(Ride);
