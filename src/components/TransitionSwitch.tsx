import React, { StatelessComponent } from 'react';
import { Switch, Route } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
const TransitionSwitch: StatelessComponent = ({ children }) => (
  <Route
    render={({ location }) => (
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="fade" timeout={300}>
          <Switch location={location}>
            <>{children}</>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    )}
  />
);

export default TransitionSwitch;
