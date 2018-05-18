import React, { StatelessComponent } from 'react';
import SidebarMenu from './SidebarMenu';
const SidebarTitle: StatelessComponent<{ title: string }> = ({ title }) => (
  <div
    style={{
      paddingBottom: '1.5rem',
      backgroundColor: '#00000010',
      display: 'flex',
      justifyContent: 'center'
    }}
  >
    <SidebarMenu />
    <h2 style={{ color: 'white', fontStyle: 'italic' }}>{title}</h2>
  </div>
);

export default SidebarTitle;
