import React, { StatelessComponent } from 'react';
import RideCreation from '../components/rider/RideCreation';
import { connect } from 'react-redux';
import AppState from '../typings/AppState';
import RideDetails from '../typings/RideDetails';
import ActiveRide from '../components/rider/ActiveRide';

const Ride: StatelessComponent<{ activeRide: RideDetails }> = ({ activeRide }) =>
  activeRide ? <ActiveRide /> : <RideCreation />;

export default connect((state: AppState) => ({ activeRide: state.activeRide }))(Ride);
