import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import appStart from './appStart';
import AuthRoute from './components/AuthRoute';
import Ride from './pages/Ride';
import UnfoundRoute from './components/UnfoundRoute';
import TransitionSwitch from './components/TransitionSwitch';

class AppRouter extends Component {
  state = { loading: true };

  async componentDidMount() {
    await appStart();
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return null;
    }

    return (
      <TransitionSwitch>
        <Route exact path="/login" component={Login} />
        <AuthRoute exact path="/" component={Home} />
        <AuthRoute exact path="/profile" component={Profile} />
        <AuthRoute exact path="/ride" component={Ride} />
        <Route component={UnfoundRoute} />
      </TransitionSwitch>
    );
  }
}
export default AppRouter;
