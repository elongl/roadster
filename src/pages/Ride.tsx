import React from 'react';
import SidebarMenu from '../components/SidebarMenu';
import viewportCenter from '../styles/viewportCenter';
const Ride = () => (
  <div style={{ color: 'white' }}>
    <SidebarMenu />
    <div style={viewportCenter}>
      <h1>Pick a destination</h1>
      <h3>From:</h3>
      <h3>To:</h3>
      <h3>At:</h3>
    </div>
  </div>
);

export default Ride;
