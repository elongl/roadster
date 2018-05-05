import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './AppRouter';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './injectGlobal';
import ErrorBoundary from './pages/ErrorBoundary';
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </ErrorBoundary>
  </Provider>,
  document.getElementById('root') as HTMLElement
);

// registerServiceWorker();
if (module.hot) {
  module.hot.accept();
}
