import React, { StatelessComponent } from 'react';
import SidebarTitle from '../components/common/SidebarTitle';
import RidesList from '../components/driver/RidesList';

const Drive: StatelessComponent = () => (
  <div>
    <SidebarTitle title="Pick someone up." />
    <RidesList />
  </div>
);

export default Drive;
