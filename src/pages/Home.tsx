import React, { StatelessComponent } from 'react';
import { Divider, Button, Icon, SemanticICONS } from 'semantic-ui-react';
import viewportCenter from '../styles/viewportCenter';
import { Link } from 'react-router-dom';
import AppState from '../typings/AppState';
import { connect } from 'react-redux';
import UserDetails from '../typings/UserDetails';
import SidebarMenu from '../components/common/SidebarMenu';

const LinkButton: StatelessComponent<LinkButton> = props => (
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

const Home: StatelessComponent<{ isDriver: UserDetails['isDriver'] }> = ({
  isDriver
}) => (
  <div style={viewportCenter}>
    <SidebarMenu />
    <LinkButton to="/ride" content="Get a Ride" icon="car" />
    <Divider horizontal style={{ color: 'white' }}>
      OR
    </Divider>
    <LinkButton to="/drive" content="Be a Driver" icon="taxi" disabled={!isDriver} />
  </div>
);

const mapStateToProps = (state: AppState) => ({
  isDriver: state.user && state.user.isDriver
});
export default connect(mapStateToProps)(Home);

interface LinkButton {
  to: string;
  content: string;
  icon: SemanticICONS;
  disabled?: boolean;
}
