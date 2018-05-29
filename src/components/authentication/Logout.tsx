import React, { StatelessComponent } from 'react';
import viewportCenter from '../../styles/viewportCenter';
import center from '../../styles/center';
import { Button } from 'semantic-ui-react';
import logout from '../../api/other/logout';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deserializeUser } from '../../actions/user';

const Logout: StatelessComponent<{ logoutFromStore: typeof deserializeUser }> = ({
  logoutFromStore
}) => (
  <div style={viewportCenter}>
    <h3 style={{ fontStyle: 'italic', color: 'white' }}>
      Are you sure you would like to log out?
    </h3>
    <div style={{ display: 'flex' }}>
      <Button
        as={Link}
        to="/login"
        negative
        style={{ width: '50%', margin: '0.5rem', ...center }}
        onClick={() => logout().then(() => logoutFromStore())}
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

export default connect(undefined, { logoutFromStore: deserializeUser })(Logout);
