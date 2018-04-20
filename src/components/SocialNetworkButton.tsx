import React from 'react';
import { Button, ButtonProps } from 'semantic-ui-react';
const SocialNetworkButton: React.StatelessComponent<ButtonProps> = props => (
  <Button
    icon={props.colorAndIcon}
    style={{ marginBottom: 15, width: 265 }}
    size="big"
    color={props.colorAndIcon}
    content={`Sign in with ${props.content}`}
  />
);
export default SocialNetworkButton;
