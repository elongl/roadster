import React, { StatelessComponent } from 'react';
import { Button, Icon } from 'semantic-ui-react';

const IsDriverForm: StatelessComponent<{
  changeIsDriver: (isDriver: boolean) => void;
}> = props => (
  <>
    <h3 style={{ color: 'white' }}>
      Would you like to list yourself as a driver?
      <span
        style={{
          display: 'block',
          fontSize: '1rem',
          textAlign: 'center',
          fontWeight: 100,
          fontStyle: 'italic'
        }}
      >
        (You can always change later in settings)
      </span>
    </h3>
    <Button.Group size="huge">
      <Button primary onClick={() => props.changeIsDriver(true)}>
        <Icon name="checkmark" />
        Yes
      </Button>
      <Button.Or />
      <Button secondary onClick={() => props.changeIsDriver(true)}>
        <Icon name="remove" />
        No
      </Button>
    </Button.Group>
  </>
);
export default IsDriverForm;
