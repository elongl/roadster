import React, { StatelessComponent } from 'react';
import center from '../../styles/center';
import { Form, Button } from 'semantic-ui-react';

// Use react-google-maps search box.
const RideForm: StatelessComponent = () => (
  <Form style={{ ...center, marginTop: '1rem' }}>
    <Form.Field>
      <label style={{ color: 'white' }}>Where would you like to go?</label>
      <input placeholder="First Name" />
    </Form.Field>
    <Form.Field>
      <label>Last Name</label>
      <input placeholder="Last Name" />
    </Form.Field>
    <Button type="submit">Submit</Button>
  </Form>
);

export default RideForm;
