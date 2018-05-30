import React, { StatelessComponent } from 'react';
import viewportCenter from '../../styles/viewportCenter';
import center from '../../styles/center';
import { Button } from 'semantic-ui-react';
import logout from '../../api/other/logout';
import { Link } from 'react-router-dom';

const Logout: StatelessComponent = () => (
  <div style={viewportCenter}>
    <h3 style={{ fontStyle: 'italic', color: 'white' }}>
      Are you sure you would like to log out?
    </h3>
    <div style={{ display: 'flex' }}>
      <Button
        color="google plus"
        style={{ width: '50%', margin: '0.5rem', ...center }}
        onClick={() => logout().then(() => location.reload())}
      >
        Yes, log out.
      </Button>
      <Button
        as={Link}
        to="/"
        positive
        style={{ width: '50%', margin: '0.5rem', ...center }}
      >
        No, Return to homepage.
      </Button>
    </div>
  </div>
);

export default Logout;
