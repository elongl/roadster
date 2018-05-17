import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './AppRouter';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import ErrorBoundary from './components/fallback/ErrorBoundary';
import store from './store';
import './injectGlobal';

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </ErrorBoundary>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
if (module.hot) {
  module.hot.accept();
}
