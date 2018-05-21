import React, { StatelessComponent } from 'react';
import Error from '../fallback/Error';
const UnfoundRoute: StatelessComponent = () => (
  <Error header="404 Not Found." content="Oops... Seems like you're lost." />
);

export default UnfoundRoute;
