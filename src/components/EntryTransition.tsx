import React from 'react';
import { Transition, TransitionProps } from 'semantic-ui-react';
const EntryTransition: React.StatelessComponent<TransitionProps> = props => (
  <Transition transitionOnMount duration={props.duration} animation={props.animation}>
    {props.children}
  </Transition>
);
export default EntryTransition;
