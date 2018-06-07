import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppState from '../types/AppState';
import ProfileViewMode from '../components/profile/ProfileViewMode';
import UserDetails from '../types/UserDetails';
import ProfileEditMode from '../components/profile/ProfileEditMode';

class Profile extends Component<
  {
    user: UserDetails;
  },
  { editMode: boolean }
> {
  state = { editMode: false };

  switchMode = () => this.setState(prevState => ({ editMode: !prevState.editMode }));
  render() {
    const { user } = this.props;
    const { editMode } = this.state;
    if (editMode) {
      return <ProfileEditMode user={user} switchMode={this.switchMode} />;
    }
    return <ProfileViewMode user={user} switchMode={this.switchMode} />;
  }
}
export default connect((state: AppState) => ({ user: state.user }))(Profile);
