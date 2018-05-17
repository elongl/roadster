import React, { StatelessComponent } from 'react';
import SidebarMenu from './SidebarMenu';
import center from '../../styles/center';
const SidebarTitle: StatelessComponent<{ title: string }> = ({ title }) => (
  <div
    style={{
      color: 'white',
      paddingBottom: '1.5rem',
      backgroundColor: '#00000015',
      ...center
    }}
  >
    <SidebarMenu />
    <h2 style={{ fontStyle: 'italic' }}>{title}</h2>
  </div>
);

export default SidebarTitle;
