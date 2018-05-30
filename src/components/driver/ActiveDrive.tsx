import React, { Component } from 'react';
import AppState from '../../typings/AppState';
import WaitingRiderConfirmation from './WaitingRiderConfirmation';
import LiveRide from './LiveRide';
import { connect } from 'react-redux';
import getUser from '../../api/read/getUser';

class ActiveDrive extends Component<{ activeDrive: AppState['activeDrive'] }> {
  state = { rider: null };

  componentDidMount() {
    const { activeDrive } = this.props;
    if (activeDrive) {
      getUser(activeDrive.riderId).then(rider => this.setState({ rider }));
    }
  }

  render() {
    const { activeDrive } = this.props;
    if (activeDrive && activeDrive.status === 'confirming') {
      return <WaitingRiderConfirmation rider={this.state.rider} />;
    }
    return <LiveRide />;
  }
}

const mapStateToProps = (state: AppState) => ({ activeDrive: state.activeDrive });
export default connect(mapStateToProps)(ActiveDrive);
