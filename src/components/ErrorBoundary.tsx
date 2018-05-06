import React, { StatelessComponent } from 'react';
import { connect } from 'react-redux';
import AppState from '../typing/AppState';
import viewportCenter from '../styles/viewportCenter';
import { Image, Button } from 'semantic-ui-react';

const ErrorBoundary: StatelessComponent<{
  networkError: AppState['networkError'];
}> = props => {
  if (props.networkError) {
    return (
      <div
        style={{
          ...viewportCenter,
          textAlign: 'center',
          color: 'white'
        }}
      >
        <Image src="/assets/images/cloud-error.svg" size="small" />
        <h2>Network Error Occured.</h2>
        <h3 style={{ width: '60%' }}>We had some problem with your last request.</h3>
        <Button
          inverted
          negative
          circular
          icon="repeat"
          size="big"
          content="Try Again"
          onClick={() => location.reload()}
        />
      </div>
    );
  }
  return <>{props.children}</>;
};

const mapStateToProps = (state: AppState) => ({ networkError: state.networkError });
export default connect(mapStateToProps)(ErrorBoundary);
