import React, { Component } from 'react';
import PhoneNumberForm from './PhoneNumberForm';
import IsDriverForm from './IsDriverForm';
import viewportCenter from '../styles/viewportCenter';
import AppState from '../types/AppState';
// import updateUser from '../api/updateUser';

export default class Registration extends Component<
  { user: AppState['user'] },
  { stage: number; phoneNumber: string; isDriver: boolean | undefined }
> {
  state = {
    stage: 1,
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
    const { stage } = this.state;
    return (
      <div style={viewportCenter}>
        {stage === 1 && (
          <PhoneNumberForm
            phoneNumber={this.state.phoneNumber}
            changePhoneNumber={this.changePhoneNumber}
            pushStage={this.pushStage}
          />
        )}
        {stage === 2 && <IsDriverForm changeIsDriver={this.changeIsDriver} />}
        {stage === 3 && (
          <h1>
            Thank you for your joining the Roadster team!<span
              style={{ display: 'block' }}
            >
              You will be redirected soon.
            </span>
          </h1>
        )}
      </div>
    );
  }
}
