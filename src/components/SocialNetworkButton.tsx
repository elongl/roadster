import * as React from 'react';
import { Button, ButtonProps } from 'semantic-ui-react';
const SocialNetworkButton = (props: Props) => (
  <Button
    icon={props.colorAndIcon}
    style={{ marginBottom: 15, width: 265 }}
    size="big"
    color={props.colorAndIcon}
    content={`Sign in with ${props.content}`}
  />
);
interface Props {
  content: ButtonProps['content'];
  colorAndIcon: ButtonProps['color'] | ButtonProps['icon'];
}
export default SocialNetworkButton;
