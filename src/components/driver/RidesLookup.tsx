import React, { StatelessComponent } from 'react';
import SidebarTitle from '../common/SidebarTitle';
import RidesList from './RidesList';

const RidesLookup: StatelessComponent = () => (
  <>
    <SidebarTitle title="Pick someone up." />
    <RidesList />
  </>
);

export default RidesLookup;
