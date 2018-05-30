import React, { Component } from 'react';
import WaitingForDriver from './WaitingForDriver';
import deleteRide from '../../api/delete/deleteRide';
import {
  removeActiveRide as removeActiveRideAction,
  setActiveRide as setActiveRideAction
} from '../../actions/activeRide';
import { connect } from 'react-redux';
import AppState from '../../typings/AppState';
import UserDetails from '../../typings/UserDetails';
import DriverFound from './DriverFound';
import getUser from '../../api/read/getUser';
import confirmRide from '../../api/update/confirmRide';
import LiveRide from './LiveRide';
import completeRide from '../../api/update/completeRide';

interface ActiveRideProps {
  removeActiveRide: typeof removeActiveRideAction;
  setActiveRide: typeof setActiveRideAction;
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

  confirmRide = () => {
    const { activeRide, setActiveRide } = this.props;
    console.log(activeRide);
    confirmRide().then(() => {
      if (activeRide) {
        setActiveRide({ ...activeRide, status: 'in progress' });
      }
    });
  };

  completeRide = () => {
    const { removeActiveRide } = this.props;
    completeRide().then(() => {
      removeActiveRide();
    });
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
    if (activeRide) {
      if (activeRide.status === 'in progress') {
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
    return null;
  }
}

export default connect((state: AppState) => ({ activeRide: state.activeRide }), {
  removeActiveRide: removeActiveRideAction,
  setActiveRide: setActiveRideAction
})(ActiveRide);
