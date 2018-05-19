import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import appStart from './appStart';
import AuthRoute from './components/routing/AuthRoute';
import Ride from './pages/Ride';
import Drive from './pages/Drive';
import UnfoundRoute from './components/routing/UnfoundRoute';
import TransitionSwitch from './components/routing/TransitionSwitch';
import Testing from './components/Testing';

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
        <Route
          exact
          path="/test"
          component={() => (
            <Testing
              containerElement={<div style={{ height: `100vh` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          )}
        />
        <Route exact path="/login" component={Login} />
        <AuthRoute exact path="/" component={Home} />
        <AuthRoute exact path="/profile" component={Profile} />
        <AuthRoute exact path="/drive" component={Drive} />
        <AuthRoute exact path="/ride" component={Ride} />
        <Route component={UnfoundRoute} />
      </TransitionSwitch>
    );
  }
}
export default AppRouter;
