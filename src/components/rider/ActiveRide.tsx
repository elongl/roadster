import React, { Component } from 'react';
import WaitingForDriver from './WaitingForDriver';
import deleteRide from '../../api/delete/deleteRide';
import {
  removeActiveRide as removeActiveRideAction,
  setActiveRide as setActiveRideAction
} from '../../actions/activeRide';
import { connect } from 'react-redux';
import AppState from '../../types/AppState';
import DriverFound from './DriverFound';
import getUser from '../../api/read/getUser';
import confirmRide from '../../api/update/confirmRide';
import LiveRide from './LiveRide';
import completeRide from '../../api/update/completeRide';
import socket from '../../api/socket';
import getRide from '../../api/read/getRide';
import RideDetails from '../../types/RideDetails';
import { withRouter, RouteComponentProps } from 'react-router';

class ActiveRide extends Component<
  RouteComponentProps<{}> & {
    removeActiveRide: typeof removeActiveRideAction;
    setActiveRide: typeof setActiveRideAction;
    activeRide: RideDetails;
  }
> {
  state = { driver: null };

  deleteRide = () => deleteRide().then(this.props.removeActiveRide);

  confirmRide = () => {
    const { activeRide, setActiveRide } = this.props;
    confirmRide().then(() => {
      setActiveRide({ ...activeRide, status: 'live' });
    });
  };

  completeRide = () => {
    const { removeActiveRide, history } = this.props;
    completeRide().then(() => {
      removeActiveRide();
      history.push('/');
    });
  };

  updateDriver = () => {
    const { activeRide } = this.props;
    if (activeRide.driverId) {
      getUser(activeRide.driverId).then(driver => this.setState({ driver }));
    }
  };

  lookForDrivers = () => {
    const { setActiveRide, activeRide } = this.props;
    socket.once(`matchdriver/${activeRide.id}`, async () => {
      const activeRideWithDriver = await getRide(activeRide.id);
      setActiveRide(activeRideWithDriver);
      this.listenForUnmatch();
      this.updateDriver();
    });
  };

  listenForUnmatch = () => {
    const { setActiveRide, activeRide } = this.props;
    socket.once(`unmatchdriver/${activeRide.id}`, async () => {
      setActiveRide({ ...activeRide, driverId: null, status: 'waiting' });
      this.lookForDrivers();
    });
  };

  async componentDidMount() {
    const { activeRide } = this.props;
    if (!activeRide.driverId) {
      this.lookForDrivers();
    } else {
      this.listenForUnmatch();
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

export default withRouter(
  connect(
    (state: AppState) => ({ activeRide: state.activeRide }),
    {
      removeActiveRide: removeActiveRideAction,
      setActiveRide: setActiveRideAction
    }
  )(ActiveRide)
);
