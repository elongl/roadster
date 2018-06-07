import React, { Component } from 'react';
import AppState from '../types/AppState';
import getUser from '../api/read/getUser';
import { connect } from 'react-redux';
import { setWaitingRides } from '../actions/waitingRides';
import RidesLookup from '../components/driver/RidesLookup';
import RidePage from '../components/driver/RidePage';
import {
  Switch,
  Route,
  withRouter,
  RouteComponentProps,
  Redirect
} from 'react-router-dom';
import getWaitingRides from '../api/read/getWaitingRides';
import RideDetails from '../types/RideDetails';
import ActiveDrive from '../components/driver/ActiveDrive';
import socket from '../api/socket';

class Drive extends Component<
  {
    isActiveRide: boolean;
    isActiveDrive: boolean;
    setWaitingRides: typeof setWaitingRides;
  } & RouteComponentProps<{}>
> {
  state = { loading: true };
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

  async componentDidMount() {
    await this.setWaitingRides();
    socket.on('rideslist_changed', this.setWaitingRides);
    this.setState({ loading: false });
  }

  componentWillUnmount() {
    socket.off('rideslist_changed');
  }

  render() {
    const { isActiveRide, isActiveDrive } = this.props;
    const { loading } = this.state;
    if (loading) {
      return null;
    }
    if (isActiveRide) {
      return <Redirect to="/ride" />;
    }
    if (isActiveDrive) {
      return <ActiveDrive />;
    }
    return (
      <Switch>
        <Route exact path="/drive" component={RidesLookup} />
        <Route exact path="/drive/:rideId" component={RidePage} />
      </Switch>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  isActiveRide: Boolean(state.activeRide),
  isActiveDrive: Boolean(state.activeDrive)
});
export default withRouter(
  connect(
    mapStateToProps,
    { setWaitingRides }
  )(Drive)
);
