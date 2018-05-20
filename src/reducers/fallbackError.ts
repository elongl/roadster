import AppState from '../typings/AppState';
import { ErrorAction } from '../actions/fallbackError';

const fallbackError = (state: AppState['fallbackError'] = null, action: ErrorAction) => {
  if (action.type === 'NETWORK_ERROR' || action.type === 'CLIENT_ERROR') {
    return action;
  }
  return state;
};

export default fallbackError;
