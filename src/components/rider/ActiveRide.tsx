import React, { Component } from 'react';
import WaitingForDriver from './WaitingForDriver';
import deleteRide from '../../api/delete/deleteRide';
import { removeActiveRide } from '../../actions/activeRide';
import { connect } from 'react-redux';
import AppState from '../../typings/AppState';
import UserDetails from '../../typings/UserDetails';
import DriverFound from './DriverFound';
import getUser from '../../api/read/getUser';

interface ActiveRideProps {
  removeActiveRide: typeof removeActiveRide;
  activeRide: AppState['activeRide'];
}

interface ActiveRideState {
  driver: UserDetails | null;
}
class ActiveRide extends Component<ActiveRideProps> {
  state = { driver: null };

  deleteRide = () => {
    deleteRide().then(() => this.props.removeActiveRide());
  };

  updateDriver = () => {
    const { activeRide } = this.props;
    if (activeRide && activeRide.driverId) {
      getUser(activeRide.driverId).then(driver => this.setState({ driver }));
    }
  };

  componentDidMount() {
    this.updateDriver();
  }

  componentDidUpdate(prevProps: ActiveRideProps, prevState: ActiveRideState) {
    if (prevState.driver === null) {
      this.updateDriver();
    }
  }

  render() {
    const { activeRide } = this.props;
    return activeRide && activeRide.driverId ? (
      <DriverFound driver={this.state.driver} deleteRide={this.deleteRide} />
    ) : (
      <WaitingForDriver deleteRide={this.deleteRide} />
    );
  }
}

export default connect((state: AppState) => ({ activeRide: state.activeRide }), {
  removeActiveRide
})(ActiveRide);
