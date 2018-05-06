import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import appStart from './appStart';

export default class AppRouter extends Component {
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
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={Profile} />
      </Switch>
    );
  }
}
