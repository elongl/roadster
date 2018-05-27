import React, { StatelessComponent } from 'react';
import {
  Segment,
  Header,
  Image,
  Button,
  SemanticICONS,
  ButtonProps
} from 'semantic-ui-react';
import SidebarTitle from '../components/common/SidebarTitle';
const myPic =
  'https://avatars0.githubusercontent.com/u/30181361?s=400&u=8a55ed4fa15d6e55bbc47dff654d67c38292e827&v=4';

const ContactButton: StatelessComponent<{
  content: string;
  link: string;
  icon: SemanticICONS;
  color: ButtonProps['color'];
}> = ({ content, icon, color, link }) => (
  <Button
    fluid
    size="big"
    content={content}
    icon={icon}
    color={color}
    style={{ marginTop: '0.5rem' }}
    onClick={() => location.replace(link)}
  />
);

const Support: StatelessComponent = () => (
  <>
    <SidebarTitle title="Help & Support" />
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: '1rem'
      }}
    >
      <Segment raised padded style={{ width: '85%', fontSize: '1.165rem' }}>
        If you need help, have ideas for improvements, please contact me at:
        <span style={{ fontStyle: 'italic', fontWeight: 700 }}>elongliks@gmail.com</span>
      </Segment>
      <div style={{ width: '65%', margin: '1rem' }}>
        <ContactButton
          content="Github"
          icon="github"
          color="black"
          link="https://github.com/elongl"
        />
        <ContactButton
          content="Twitter"
          icon="twitter"
          color="twitter"
          link="https://twitter.com/elongli"
        />
      </div>
      <Image rounded size="small" src={myPic} style={{ marginTop: '1rem' }} />
      <Header size="huge" style={{ color: 'white', margin: 0, marginTop: '1rem' }}>
        Elon Gliksberg
      </Header>
    </div>
  </>
);

export default Support;
