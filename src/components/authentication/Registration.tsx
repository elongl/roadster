import React, { Component } from 'react';
import PhoneNumberForm from './PhoneNumberForm';
import IsDriverForm from './IsDriverForm';
import viewportCenter from '../../styles/viewportCenter';
import updateUser from '../../api/update/updateUser';
import { withRouter, RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/user';
import AppState from '../../types/AppState';
import UserDetails from '../../types/UserDetails';

class Registration extends Component<
  { loginUser: typeof loginUser; user: UserDetails } & RouteComponentProps<{}>,
  { stage: number; phoneNumber: string; isDriver: boolean | undefined }
> {
  state = {
    stage: 1,
    phoneNumber: '',
    isDriver: undefined
  };

  changePhoneNumber = (phoneNumber: string) => this.setState({ phoneNumber });

  changeIsDriver = (isDriver: boolean) => this.setState({ isDriver }, this.updateUser);

  updateUser = () => {
    const { isDriver } = this.state;
    const { user, history, loginUser: setUser } = this.props;
    const phoneNumber = '0' + this.state.phoneNumber.replace('-', '');
    updateUser({ phoneNumber, isDriver }).then(this.pushStage);
    setTimeout(() => {
      setUser({ ...user, phoneNumber, isDriver });
      history.push('/');
    }, 2750);
  };

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
          <h3 style={{ color: 'white', fontStyle: 'italic' }}>
            Thank you for your joining the Roadster team!
            <span style={{ display: 'block', textAlign: 'center' }}>
              You will be redirected shortly.
            </span>
          </h3>
        )}
      </div>
    );
  }
}
export default withRouter(
  connect(
    (state: AppState) => ({ user: state.user }),
    { loginUser }
  )(Registration)
);
