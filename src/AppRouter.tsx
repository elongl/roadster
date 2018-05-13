import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import appStart from './appStart';
import AuthRoute from './components/AuthRoute';
import Ride from './pages/Ride';

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
        <AuthRoute exact path="/ride" component={Ride} />
      </Switch>
    );
  }
}
export default AppRouter;
