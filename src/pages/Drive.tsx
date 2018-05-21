import React, { StatelessComponent } from 'react';
import RidesLookup from '../components/driver/RidesLookup';
import RidePage from '../components/driver/RidePage';
import { Switch, Route } from 'react-router-dom';

const Drive: StatelessComponent = () => (
  <Switch>
    <Route exact path="/drive" component={RidesLookup} />
    <Route exact path="/drive/:rideId" component={RidePage} />
  </Switch>
);

export default Drive;
