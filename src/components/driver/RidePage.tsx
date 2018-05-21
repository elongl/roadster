import React, { Component } from 'react';
import request from '../../api/request';
import { RouteComponentProps } from 'react-router-dom';
import Loader from '../../components/common/Loader';
import UserRide from '../../typings/UserRide';
import SidebarTitle from '../common/SidebarTitle';
class RidePage extends Component<RouteComponentProps<{ rideId: number }>> {
  state: { userRide: UserRide | undefined } = { userRide: undefined };
  async componentDidMount() {
    const { rideId } = this.props.match.params;
    try {
      const { data: ride } = await request.get(`/ride/${rideId}`);
      const { data: user } = await request.get(`/user/${ride.riderId}`);
      this.setState({ userRide: { ride, user } });
    } catch (err) {
      this.props.history.push('/drive');
    }
  }

  render() {
    if (!this.state.userRide) {
      return <Loader />;
    }
    return (
      <div>
        <SidebarTitle title={this.state.userRide.user.displayName} />
      </div>
    );
  }
}
export default RidePage;
