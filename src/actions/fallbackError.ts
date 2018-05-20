import { Action } from 'redux';
const networkError = (error: Error) => ({ type: 'NETWORK_ERROR', error });
const clientError = (error: Error) => ({ type: 'CLIENT_ERROR', error });

interface ErrorAction extends Action {
  error: Error;
}
export { clientError, networkError, ErrorAction };
