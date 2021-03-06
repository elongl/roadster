import React, { StatelessComponent, Component } from 'react';
import { SemanticICONS, Sidebar, Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

interface LinkButton {
  content: string;
  icon: SemanticICONS;
  to: string;
  toggleVisibility: () => void;
}

const LinkButton: StatelessComponent<LinkButton> = ({
  content,
  icon,
  to,
  toggleVisibility
}) => (
  <Menu.Item as={Link} to={to} onClick={toggleVisibility} content={content} icon={icon} />
);

const routes = [
  {
    content: 'Home',
    icon: 'home' as SemanticICONS,
    to: '/'
  },
  {
    content: 'Ride',
    icon: 'car' as SemanticICONS,
    to: '/ride'
  },
  {
    content: 'Drive',
    icon: 'dashboard' as SemanticICONS,
    to: '/drive'
  },
  {
    content: 'Profile',
    icon: 'user circle' as SemanticICONS,
    to: '/profile'
  },
  {
    content: 'Help & Support',
    icon: 'help circle outline' as SemanticICONS,
    to: '/support'
  },
  {
    content: 'Log Out',
    icon: 'log out' as SemanticICONS,
    to: '/logout'
  }
];

class SidebarMenu extends Component {
  state = { visible: false };
  toggleVisibility = () =>
    this.setState((prevState: { visible: boolean }) => ({
      visible: !prevState.visible
    }));

  render() {
    const { visible } = this.state;
    return (
      <div style={{ position: 'fixed', top: '0.75rem', left: '0.75rem', zIndex: 1 }}>
        <Icon
          link
          circular
          name="bars"
          style={{ color: 'white', fontSize: '2rem' }}
          onClick={this.toggleVisibility}
        />
        <Sidebar
          inverted
          vertical
          as={Menu}
          icon="labeled"
          visible={visible}
          animation="overlay"
          style={{ width: '10rem' }}
        >
          <Menu.Item content="Cancel" icon="cancel" onClick={this.toggleVisibility} />
          {routes.map(route => (
            <LinkButton
              toggleVisibility={this.toggleVisibility}
              content={route.content}
              icon={route.icon}
              key={route.to}
              to={route.to}
            />
          ))}
        </Sidebar>
      </div>
    );
  }
}
export default SidebarMenu;
