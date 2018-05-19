import React from 'react';
import SidebarTitle from '../components/common/SidebarTitle';
import RideForm from '../components/rider/RideForm';

const Ride = () => (
  <div>
    <SidebarTitle title="Pick a destination." />
    <RideForm />
  </div>
);

export default Ride;
