import React, { Component } from 'react';
import AppState from '../../typings/AppState';
import WaitingRiderConfirmation from './WaitingRiderConfirmation';
import LiveDrive from './LiveDrive';
import { connect } from 'react-redux';
import getUser from '../../api/read/getUser';
import socket from '../../api/socket';
import completeRide from '../../api/update/completeRide';
import {
  setActiveDrive as setActiveDriveAction,
  removeActiveDrive as removeActiveDriveAction
} from '../../actions/activeDrive';

class ActiveDrive extends Component<{
  activeDrive: AppState['activeDrive'];
  setActiveDrive: typeof setActiveDriveAction;
  removeActiveDrive: typeof removeActiveDriveAction;
}> {
  state = { rider: null };

  componentDidMount() {
    const { activeDrive, setActiveDrive } = this.props;
    if (activeDrive) {
      getUser(activeDrive.riderId).then(rider => this.setState({ rider }));
      if (activeDrive.status === 'confirming') {
        socket.on(`confirm/${activeDrive.id}`, () => {
          setActiveDrive({ ...activeDrive, status: 'in progress' });
        });
      }
    }
  }

  completeRide = () => {
    const { removeActiveDrive } = this.props;
    completeRide().then(() => {
      removeActiveDrive();
    });
  };

  render() {
    const { activeDrive } = this.props;
    if (activeDrive && activeDrive.status === 'confirming') {
      return <WaitingRiderConfirmation rider={this.state.rider} />;
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
