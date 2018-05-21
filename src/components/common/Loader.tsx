import React, { StatelessComponent } from 'react';
import { Dimmer, Loader as Loading } from 'semantic-ui-react';
const Loader: StatelessComponent = () => (
  <Dimmer active inverted>
    <Loading inverted>Loading</Loading>
  </Dimmer>
);
export default Loader;
