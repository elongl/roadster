import AppState from '../typing/AppState';
import { ErrorAction } from '../actions/networkError';

const networkError = (state: AppState['networkError'] = null, action: ErrorAction) => {
  if (action.type === 'NETWORK_ERROR') {
    return action.error;
  }
  return state;
};

export default networkError;
