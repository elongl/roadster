import React, { StatelessComponent } from 'react';
import { Transition, TransitionProps } from 'semantic-ui-react';
const EntryTransition: StatelessComponent<TransitionProps> = props => (
  <Transition
    transitionOnMount
    duration={props.duration || 1500}
    animation={props.animation}
  >
    {props.children}
  </Transition>
);
export default EntryTransition;
