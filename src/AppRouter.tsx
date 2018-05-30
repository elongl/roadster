import React, { Component } from 'react';
import { Route, Switch, withRouter, RouteComponentProps } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import appStart from './appStart';
import AuthRoute from './components/routing/AuthRoute';
import Ride from './pages/Ride';
import Drive from './pages/Drive';
import UnfoundRoute from './components/routing/UnfoundRoute';
import DriverRoute from './components/routing/DriverRoute';
import Support from './pages/Support';
import SidebarMenu from './components/common/SidebarMenu';
import Logout from './components/authentication/Logout';
import { connect } from 'react-redux';
import AppState from './typings/AppState';
import MessageLoader from './components/common/MessageLoader';

class AppRouter extends Component<
  RouteComponentProps<{}> & { isActiveRide: boolean; isActiveDrive: boolean }
> {
  state = { loading: true };

  async componentDidMount() {
    await appStart();
    const { isActiveRide, isActiveDrive, history } = this.props;
    if (isActiveRide) {
      history.push('/ride');
    } else if (isActiveDrive) {
      history.push('/drive');
    }
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return <MessageLoader>Please Wait.</MessageLoader>;
    }
    return (
      <>
        {location.pathname !== '/login' && <SidebarMenu />}
        <Switch>
          <Route exact path="/login" component={Login} />
          <AuthRoute exact path="/" component={Home} />
          <AuthRoute exact path="/profile" component={Profile} />
          <AuthRoute exact path="/logout" component={Logout} />
          <DriverRoute path="/drive" component={Drive} />
          <AuthRoute exact path="/ride" component={Ride} />
          <Route exact path="/support" component={Support} />
          <Route component={UnfoundRoute} />
        </Switch>
      </>
    );
  }
}
const mapStateToProps = (state: AppState) => ({
  isActiveRide: Boolean(state.activeRide),
  isActiveDrive: Boolean(state.activeDrive)
});
export default withRouter(connect(mapStateToProps)(AppRouter));
