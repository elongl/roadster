import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppState from '../../typings/AppState';
import Error from './Error';
import store from '../../store';
import { clientError } from '../../actions/fallbackError';

class ErrorBoundary extends Component<{ fallbackError: AppState['fallbackError'] }> {
  componentDidCatch(error: Error) {
    store.dispatch(clientError(error));
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
            content="There was an error with our services."
          />
        );
      default:
        return children;
    }
  }
}

const mapStateToProps = (state: AppState) => ({ fallbackError: state.fallbackError });
export default connect(mapStateToProps)(ErrorBoundary);
