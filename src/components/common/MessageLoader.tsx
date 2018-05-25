import React, { StatelessComponent } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
const MessageLoader: StatelessComponent = ({ children }) => (
  <Dimmer active>
    <Loader size="big" inverted indeterminate>
      {children}
    </Loader>
  </Dimmer>
);
export default MessageLoader;
