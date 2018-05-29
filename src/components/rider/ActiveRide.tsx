import React, { Component } from 'react';
import WaitingForDriver from './WaitingForDriver';
import deleteRide from '../../api/deleteRide';
import { removeActiveRide } from '../../actions/activeRide';
import { connect } from 'react-redux';

class ActiveRide extends Component<{
  removeActiveRide: typeof removeActiveRide;
}> {
  state = { loading: false };
  deleteRide = () => {
    deleteRide().then(() => this.props.removeActiveRide());
  };
  render() {
    return <WaitingForDriver deleteRide={this.deleteRide} />;
  }
}

export default connect(undefined, { removeActiveRide })(ActiveRide);
