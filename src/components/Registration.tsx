import React, { Component } from 'react';
import PhoneNumberForm from './PhoneNumberForm';
import IsDriverForm from './IsDriverForm';
import viewportCenter from '../styles/viewportCenter';
import AppState from '../typing/AppState';
// import updateUser from '../api/updateUser';

export default class Registration extends Component<
  { user: AppState['user'] },
  { stage: number; phoneNumber: string; isDriver: boolean | undefined }
> {
  state = {
    stage: this.props.user && this.props.user.phoneNumber ? 2 : 1,
    phoneNumber: '',
    isDriver: undefined
  };

  changePhoneNumber = (phoneNumber: string) => {
    this.setState({ phoneNumber });
  };

  changeIsDriver = (isDriver: boolean) => {
    this.setState({ isDriver });
    // this.updateUser();
  };
  /*
  updateUser = () => {
    updateUser.then(() => this.pushStage());
  };
  */

  pushStage = () => {
    this.setState(prevState => ({ stage: prevState.stage + 1 }));
  };

  render() {
    return (
      <div style={viewportCenter}>
        {this.state.stage === 1 ? (
          <PhoneNumberForm
            phoneNumber={this.state.phoneNumber}
            changePhoneNumber={this.changePhoneNumber}
            pushStage={this.pushStage}
          />
        ) : (
          <IsDriverForm changeIsDriver={this.changeIsDriver} />
        )}
      </div>
    );
  }
}
