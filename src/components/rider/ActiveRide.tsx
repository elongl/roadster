import React, { Component } from 'react';
import WaitingForDriver from './WaitingForDriver';
import deleteRide from '../../api/delete/deleteRide';
import {
  removeActiveRide as removeActiveRideAction,
  setActiveRide as setActiveRideAction
} from '../../actions/activeRide';
import { connect } from 'react-redux';
import AppState from '../../typings/AppState';
import DriverFound from './DriverFound';
import getUser from '../../api/read/getUser';
import confirmRide from '../../api/update/confirmRide';
import LiveRide from './LiveRide';
import completeRide from '../../api/update/completeRide';
import socket from '../../api/socket';
import getRide from '../../api/read/getRide';
import RideDetails from '../../typings/RideDetails';

class ActiveRide extends Component<{
  removeActiveRide: typeof removeActiveRideAction;
  setActiveRide: typeof setActiveRideAction;
  activeRide: RideDetails;
}> {
  state = { driver: null };

  deleteRide = () => deleteRide().then(this.props.removeActiveRide);

  confirmRide = () => {
    const { activeRide, setActiveRide } = this.props;
    confirmRide().then(() => {
      setActiveRide({ ...activeRide, status: 'live' });
    });
  };

  completeRide = () => {
    const { removeActiveRide } = this.props;
    completeRide().then(removeActiveRide);
  };

  updateDriver = () => {
    const { activeRide } = this.props;
    if (activeRide && activeRide.driverId) {
      getUser(activeRide.driverId).then(driver => this.setState({ driver }));
    }
  };

  async componentDidMount() {
    const { setActiveRide, activeRide } = this.props;
    if (activeRide && !activeRide.driverId) {
      socket.on(`matchdriver/${activeRide.id}`, async () => {
        const activeRideWithDriver = await getRide(activeRide.id);
        setActiveRide(activeRideWithDriver);
        this.updateDriver();
        socket.on(`unmatchdriver/${activeRide.id}`, async () => {
          setActiveRide({ ...activeRide, driverId: null, status: 'waiting' });
        });
      });
    } else {
      this.updateDriver();
    }
  }

  render() {
    const { activeRide } = this.props;
    if (activeRide.status === 'live') {
      return (
        <LiveRide
          completeRide={this.completeRide}
          driver={this.state.driver}
          ride={activeRide}
        />
      );
    }
    if (activeRide.driverId) {
      return (
        <DriverFound
          driver={this.state.driver}
          deleteRide={this.deleteRide}
          confirmRide={this.confirmRide}
        />
      );
    }
    return <WaitingForDriver deleteRide={this.deleteRide} />;
  }
}

export default connect((state: AppState) => ({ activeRide: state.activeRide }), {
  removeActiveRide: removeActiveRideAction,
  setActiveRide: setActiveRideAction
})(ActiveRide);
