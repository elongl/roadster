import React, { StatelessComponent } from 'react';
import { connect } from 'react-redux';
import AppState from '../typings/AppState';
import Error from './Error';

const ErrorBoundary: StatelessComponent<{
  networkError: AppState['networkError'];
}> = props => {
  if (props.networkError) {
    return (
      <Error
        header="Network Error Occured."
        content="We had some problem with your last request."
      />
    );
  }
  return <>{props.children}</>;
};

const mapStateToProps = (state: AppState) => ({ networkError: state.networkError });
export default connect(mapStateToProps)(ErrorBoundary);
