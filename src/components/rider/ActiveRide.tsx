import React, { Component } from 'react';
import WaitingForDriver from './WaitingForDriver';
import deleteRide from '../../api/delete/deleteRide';
import { removeActiveRide } from '../../actions/activeRide';
import { connect } from 'react-redux';
import AppState from '../../typings/AppState';
import DriverFound from './DriverFound';
import getUser from '../../api/read/getUser';

class ActiveRide extends Component<{
  removeActiveRide: typeof removeActiveRide;
  activeRide: AppState['activeRide'];
}> {
  state = { loading: false, driver: null };

  deleteRide = () => {
    deleteRide().then(() => this.props.removeActiveRide());
  };

  componentDidMount() {
    const { activeRide } = this.props;
    if (activeRide && activeRide.driverId) {
      getUser(activeRide.driverId).then(driver => this.setState({ driver }));
    }
  }

  render() {
    const { activeRide } = this.props;
    return activeRide && activeRide.driverId ? (
      <DriverFound driver={this.state.driver} />
    ) : (
      <WaitingForDriver deleteRide={this.deleteRide} />
    );
  }
}

export default connect((state: AppState) => ({ activeRide: state.activeRide }), {
  removeActiveRide
})(ActiveRide);
