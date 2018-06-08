import React, { StatelessComponent } from 'react';
import { Button, ButtonProps } from 'semantic-ui-react';

interface Props {
  colorAndIcon: ButtonProps['color'] | ButtonProps['icon'];
  name: string;
}

const SocialNetworkButton: StatelessComponent<Props> = props => (
  <Button
    as="a"
    icon={props.colorAndIcon}
    style={{ marginBottom: '1rem', width: '19rem' }}
    size="big"
    color={props.colorAndIcon}
    content={`Sign in with ${props.name}`}
    href={process.env.REACT_APP_SERVER_URL + '/auth/' + props.name}
  />
);
export default SocialNetworkButton;
