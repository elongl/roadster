import React, { Component } from 'react';
import {
  Switch,
  Route,
  withRouter,
  RouteComponentProps
} from 'react-router-dom';
import UserDetails from './ORM/UserDetails';
import Login from './pages/Login';
import Home from './pages/Home';
import getUser from './api/getUser';

interface State {
  loading: boolean;
  user: UserDetails | undefined;
}

class AppRouter extends Component<RouteComponentProps<{}>, State> {
  state = { loading: true, user: undefined };
  async componentDidMount() {
    const user = await getUser();

    if (user) {
      this.setState({ user });
    } else {
      this.props.history.push('/login');
    }
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return null;
    }
    return (
      <Switch>
        <Route
          exact={true}
          path="/"
          render={user => <Home user={this.state.user} />}
        />
        <Route exact={true} path="/login" component={Login} />
      </Switch>
    );
  }
}

export default withRouter(AppRouter);
