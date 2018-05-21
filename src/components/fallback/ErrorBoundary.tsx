import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import Error from './Error';
import AppState from '../../typings/AppState';
import { clientError } from '../../actions/fallbackError';

class ErrorBoundary extends Component<{
  fallbackError: AppState['fallbackError'];
  onClientError: (error: Error) => void;
}> {
  componentDidCatch(error: Error) {
    this.props.onClientError(error);
  }
  render() {
    const { fallbackError, children } = this.props;
    switch (fallbackError && fallbackError.type) {
      case 'NETWORK_ERROR':
        return (
          <Error
            header="Network Error Occured."
            content="We had some problem with your last request."
          />
        );
      case 'CLIENT_ERROR':
        return (
          <Error
            header="Something Went Wrong."
            content={
              this.props.fallbackError
                ? this.props.fallbackError.error.message
                : 'There has been a problem with our services.'
            }
          />
        );
      default:
        return children;
    }
  }
}
const mapDispatchToProps = (dispatch: (action: Action) => void) => ({
  onClientError: (error: Error) => {
    dispatch(clientError(error));
  }
});
const mapStateToProps = (state: AppState) => ({ fallbackError: state.fallbackError });
export default connect(mapStateToProps, mapDispatchToProps)(ErrorBoundary);
