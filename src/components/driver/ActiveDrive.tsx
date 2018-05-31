import React, { Component } from 'react';
import AppState from '../../typings/AppState';
import WaitingRiderConfirmation from './WaitingRiderConfirmation';
import LiveDrive from './LiveDrive';
import { connect } from 'react-redux';
import getUser from '../../api/read/getUser';
import socket from '../../api/socket';
import completeRide from '../../api/update/completeRide';
import unmatchDriver from '../../api/update/unmatchDriver';
import RideDetails from '../../typings/RideDetails';
import {
  setActiveDrive as setActiveDriveAction,
  removeActiveDrive as removeActiveDriveAction
} from '../../actions/activeDrive';

class ActiveDrive extends Component<{
  activeDrive: RideDetails;
  setActiveDrive: typeof setActiveDriveAction;
  removeActiveDrive: typeof removeActiveDriveAction;
}> {
  state = { rider: null };

  componentDidMount() {
    const { activeDrive, setActiveDrive, removeActiveDrive } = this.props;
    getUser(activeDrive.riderId).then(rider => this.setState({ rider }));
    if (activeDrive.status === 'confirming') {
      socket.once(`confirm/${activeDrive.id}`, () => {
        setActiveDrive({ ...activeDrive, status: 'in progress' });
      });
      socket.once(`cancel/${activeDrive.id}`, removeActiveDrive);
    }
  }

  unmatchDriver = () => {
    const { removeActiveDrive } = this.props;
    unmatchDriver().then(removeActiveDrive);
  };

  completeRide = () => {
    const { removeActiveDrive } = this.props;
    completeRide().then(removeActiveDrive);
  };

  render() {
    const { activeDrive } = this.props;
    if (activeDrive && activeDrive.status === 'confirming') {
      return (
        <WaitingRiderConfirmation
          rider={this.state.rider}
          unmatchDriver={this.unmatchDriver}
        />
      );
    }
    return (
      <LiveDrive
        completeRide={this.completeRide}
        rider={this.state.rider}
        ride={activeDrive}
      />
    );
  }
}

const mapStateToProps = (state: AppState) => ({ activeDrive: state.activeDrive });
export default connect(mapStateToProps, {
  setActiveDrive: setActiveDriveAction,
  removeActiveDrive: removeActiveDriveAction
})(ActiveDrive);
