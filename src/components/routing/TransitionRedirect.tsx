import React, { StatelessComponent } from 'react';
import { Redirect, RedirectProps } from 'react-router-dom';
const TransitionRedirect: StatelessComponent<RedirectProps> = ({ to }) =>
  location.pathname !== to ? <Redirect to={to} /> : null;
export default TransitionRedirect;
