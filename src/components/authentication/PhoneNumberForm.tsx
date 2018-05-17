import React, { StatelessComponent } from 'react';
import { Input, Flag, Label, Button, Form } from 'semantic-ui-react';
import viewportCenter from '../../styles/viewportCenter';

const PhoneNumberForm: StatelessComponent<{
  phoneNumber: string;
  pushStage: () => void;
  changePhoneNumber: (phoneNumber: string) => void;
}> = props => (
  <Form style={viewportCenter} onSubmit={() => props.pushStage()}>
    <h3 style={{ color: 'white' }}>Please enter your phone number.</h3>
    <Input
      input={
        <input
          required
          type="tel"
          pattern="05\d-?\d{7}"
          title="Israeli phone number"
          placeholder="058-7070765"
          value={props.phoneNumber}
          onChange={event => props.changePhoneNumber(event.currentTarget.value)}
          style={{
            width: '75%',
            fontSize: '1.2rem',
            border: 'none',
            fontWeight: 700,
            color: 'black'
          }}
        />
      }
      label={
        <Label
          icon={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Flag name="israel" />
              <span>+972</span>
            </div>
          }
          style={{
            backgroundColor: 'white',
            display: 'flex'
          }}
        />
      }
    />
    <Button
      basic
      inverted
      type="submit"
      content="Continue"
      style={{ marginTop: '1rem', width: '15rem' }}
    />
  </Form>
);
export default PhoneNumberForm;
