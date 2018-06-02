import AppState from '../types/AppState';
import { ErrorAction } from '../actions/fallbackError';
import { Reducer } from 'redux';

const fallbackError: Reducer<AppState['fallbackError'], ErrorAction> = (
  state = null,
  action
) => {
  if (action.type === 'NETWORK_ERROR' || action.type === 'CLIENT_ERROR') {
    return action;
  }
  return state;
};

export default fallbackError;
