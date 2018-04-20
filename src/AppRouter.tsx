import React from 'react';
import {
  Switch,
  Route,
  withRouter,
  RouteComponentProps
} from 'react-router-dom';
import Authenticate from './pages/Authenticate';
import axios from 'axios';

interface RouteProps {}
export default withRouter(
  class App extends React.Component<RouteComponentProps<RouteProps>> {
    async componentDidMount() {
      const { data: user } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/auth/user`,
        { withCredentials: true }
      );
      if (!Boolean(user)) {
        this.props.history.push('/authenticate');
      }
    }

    render() {
      return (
        <Switch>
          <Route exact={true} path="/authenticate" component={Authenticate} />
        </Switch>
      );
    }
  }
);
