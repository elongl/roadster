import * as React from 'react';
import { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Authenticate from './pages/Authenticate';

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact={true} path="/authenticate" component={Authenticate} />
      </Switch>
    );
  }
}
