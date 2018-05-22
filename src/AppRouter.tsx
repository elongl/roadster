import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import appStart from './appStart';
import AuthRoute from './components/routing/AuthRoute';
import Ride from './pages/Ride';
import Drive from './pages/Drive';
import UnfoundRoute from './components/routing/UnfoundRoute';

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
      <Switch>
        <Route exact path="/login" component={Login} />
        <AuthRoute exact path="/" component={Home} />
        <AuthRoute exact path="/profile" component={Profile} />
        <AuthRoute path="/drive" component={Drive} />
        <AuthRoute exact path="/ride" component={Ride} />
        <Route component={UnfoundRoute} />
      </Switch>
    );
  }
}
export default AppRouter;
