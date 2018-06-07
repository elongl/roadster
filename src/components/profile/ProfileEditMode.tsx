import React, { Component } from 'react';
import viewportCenter from '../../styles/viewportCenter';
import { Image, Button, Input, Radio, Form } from 'semantic-ui-react';
import UserDetails from '../../types/UserDetails';
import changedKeys from '../../utils/changedKeys';
import updateUser from '../../api/update/updateUser';
import MessageLoader from '../common/MessageLoader';
import { connect } from 'react-redux';
import { updateUser as dispatchNewUser } from '../../actions/user';

interface Props {
  user: UserDetails;
  dispatchNewUser: typeof dispatchNewUser;
  switchMode: () => void;
}
interface State {
  displayName: string;
  phoneNumber: string;
  isDriver: boolean;
  loading: boolean;
}
class ProfileEditMode extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const { user } = props;
    if (user.phoneNumber && user.isDriver !== undefined) {
      this.state = {
        displayName: user.displayName,
        phoneNumber: user.phoneNumber,
        isDriver: user.isDriver,
        loading: false
      };
    }
  }

  updateUser = () => {
    this.setState({ loading: true });
    const { switchMode, dispatchNewUser: dispatchUpdatedUser, user } = this.props;
    const { state } = this;
    const previousUser = {
      displayName: user.displayName,
      phoneNumber: user.phoneNumber,
      isDriver: user.isDriver
    };
    const changedUser = {
      displayName: state.displayName,
      phoneNumber: state.phoneNumber,
      isDriver: state.isDriver
    };
    const updatedUser = changedKeys(previousUser, changedUser).reduce((acc, value) => {
      acc[value] = changedUser[value];
      return acc;
    }, {});

    updateUser(updatedUser).then(() => {
      dispatchUpdatedUser(updatedUser);
      switchMode();
    });
  };

  render() {
    const { user } = this.props;
    const { displayName, phoneNumber, isDriver, loading } = this.state;
    if (loading) {
      return <MessageLoader>Updating your profile.</MessageLoader>;
    }
    return (
      <Form style={{ ...viewportCenter, color: 'white' }} onSubmit={this.updateUser}>
        <Image circular size="small" style={{ height: 150 }} src={user.avatar} />
        <h2>Display Name</h2>
        <Input
          required
          value={displayName}
          onChange={e => this.setState({ displayName: e.currentTarget.value })}
        />
        <h2>Phone number</h2>
        <Input
          required
          pattern="05\d-?\d{7}"
          value={phoneNumber}
          onChange={e => this.setState({ phoneNumber: e.currentTarget.value })}
        />
        <h2>Driver</h2>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span>No</span>
          <Radio
            slider
            checked={isDriver}
            style={{ margin: '0 1rem' }}
            onChange={() =>
              this.setState(prevState => ({ isDriver: !prevState.isDriver }))
            }
          />
          <span>Yes</span>
        </div>
        <Button
          positive
          type="submit"
          size="big"
          content="Finish"
          icon="checkmark"
          style={{ marginTop: '1.5rem', width: '50%' }}
        />
      </Form>
    );
  }
}

export default connect(
  undefined,
  { dispatchNewUser }
)(ProfileEditMode);
