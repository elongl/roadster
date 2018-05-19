import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppState from '../../typings/AppState';
import Error from './Error';

class ErrorBoundary extends Component<{ networkError: AppState['networkError'] }> {
  state = { clientError: false };
  componentDidCatch() {
    this.setState({ clientError: true });
    // Send error to server.
  }
  render() {
    const { networkError, children } = this.props;
    const { clientError } = this.state;
    if (networkError) {
      return (
        <Error
          header="Network Error Occured."
          content="We had some problem with your last request."
        />
      );
    }
    if (clientError) {
      return (
        <Error
          header="Something Went Wrong."
          content="There was an error with our services."
        />
      );
    }
    return children;
  }
}

const mapStateToProps = (state: AppState) => ({ networkError: state.networkError });
export default connect(mapStateToProps)(ErrorBoundary);
