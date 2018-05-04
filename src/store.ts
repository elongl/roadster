import { createStore, StoreEnhancer } from 'redux';
import rootReducer from './reducers/root';

const reduxDevtools =
  (window as ExtensionedWindow).__REDUX_DEVTOOLS_EXTENSION__ &&
  (window as ExtensionedWindow).__REDUX_DEVTOOLS_EXTENSION__();

export default createStore(rootReducer, reduxDevtools);

interface ExtensionedWindow extends Window {
  __REDUX_DEVTOOLS_EXTENSION__: () => StoreEnhancer;
}
