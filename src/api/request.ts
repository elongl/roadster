import axios from 'axios';
import store from '../store';
import { networkError } from '../actions/networkError';
const request = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true
});

request.interceptors.request.use(undefined, error => {
  store.dispatch(networkError(error));
  // Send error to server.
  return Promise.reject(error);
});

request.interceptors.response.use(undefined, error => {
  if (!error.response) {
    store.dispatch(networkError(error));
  }
  // Send error to server.
  return Promise.reject(error);
});

export default request;
