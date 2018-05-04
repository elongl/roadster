import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './AppRouter';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './injectGlobal';
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);

/*
Development Mode...
registerServiceWorker();
if (module.hot) {
  module.hot.accept();
}
*/
