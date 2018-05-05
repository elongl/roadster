import { Action } from 'redux';
const networkError = (error: Error) => ({ type: 'NETWORK_ERROR', error });

interface ErrorAction extends Action {
  error: Error;
}
export { networkError, ErrorAction };
