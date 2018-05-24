import React, { Component } from 'react';
import AppState from '../typings/AppState';
import getUser from '../api/getUser';
import { connect } from 'react-redux';
import { setWaitingRides } from '../actions/waitingRides';
import RidesLookup from '../components/driver/RidesLookup';
import RidePage from '../components/driver/RidePage';
import { Switch, Route, withRouter, RouteComponentProps } from 'react-router-dom';
import getWaitingRides from '../api/getWaitingRides';
import RideDetails from '../typings/RideDetails';

class Drive extends Component<
  {
    waitingRides: AppState['waitingRides'];
    setWaitingRides: typeof setWaitingRides;
  } & RouteComponentProps<{}>
> {
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
    return (
      <Switch>
        <Route exact path="/drive" component={RidesLookup} />
        <Route exact path="/drive/:rideId" component={RidePage} />
      </Switch>
    );
  }
}

const mapStateToProps = (state: AppState) => ({ waitingRides: state.waitingRides });
export default withRouter(connect(mapStateToProps, { setWaitingRides })(Drive));
