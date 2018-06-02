import React, { StatelessComponent } from 'react';
import { Divider, Button, Icon, SemanticICONS } from 'semantic-ui-react';
import viewportCenter from '../styles/viewportCenter';
import { Link } from 'react-router-dom';
import AppState from '../types/AppState';
import { connect } from 'react-redux';

const LinkButton: StatelessComponent<{
  to: string;
  content: string;
  icon: SemanticICONS;
  disabled?: boolean;
}> = props => (
  <Button
    inverted
    size="huge"
    style={{ width: '65%', fontStyle: 'italic' }}
    as={Link}
    to={props.to}
    disabled={props.disabled}
  >
    <Icon name={props.icon} />
    {props.content}
  </Button>
);

const Home: StatelessComponent<{
  isDriver: boolean;
  isActiveRide: boolean;
  isActiveDrive: boolean;
}> = ({ isDriver, isActiveRide, isActiveDrive }) => (
  <div style={viewportCenter}>
    <LinkButton to="/ride" content="Get a Ride" icon="car" disabled={isActiveDrive} />
    <Divider horizontal style={{ color: 'white' }}>
      OR
    </Divider>
    <LinkButton
      to="/drive"
      content="Be a Driver"
      icon="taxi"
      disabled={!isDriver || isActiveRide}
    />
  </div>
);

export default connect((state: AppState) => ({
  isDriver: state.user && state.user.isDriver,
  isActiveRide: Boolean(state.activeRide),
  isActiveDrive: Boolean(state.activeDrive)
}))(Home);
