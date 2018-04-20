import React from 'react';
import { Transition, TransitionProps } from 'semantic-ui-react';
const EntryTransition: React.StatelessComponent<TransitionProps> = props => (
  <Transition
    duration={props.duration}
    animation={props.animation}
    transitionOnMount={true}
  >
    {props.children}
  </Transition>
);
export default EntryTransition;
