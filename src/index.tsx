import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AppRouter from './AppRouter';
import registerServiceWorker from './registerServiceWorker';
const { BrowserRouter } = require('react-router-dom');
import './injectGlobal';
ReactDOM.render(
  <BrowserRouter>
    <AppRouter />
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
