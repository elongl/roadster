import React, { StatelessComponent } from 'react';
const SidebarTitle: StatelessComponent<{ title: string }> = ({ title }) => (
  <div
    style={{
      height: '5.5rem',
      backgroundColor: '#00000010',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <h2 style={{ color: 'white', fontStyle: 'italic' }}>{title}</h2>
  </div>
);

export default SidebarTitle;
