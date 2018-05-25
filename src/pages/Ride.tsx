import React, { StatelessComponent } from 'react';
import SidebarTitle from '../components/common/SidebarTitle';
import RideCreation from '../components/rider/RideCreation';

const Ride: StatelessComponent = () => (
  <div>
    <SidebarTitle title="Pick a destination." />
    <RideCreation />
  </div>
);

export default Ride;
