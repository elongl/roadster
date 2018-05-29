import socket from 'socket.io-client';
export default socket(process.env.REACT_APP_SERVER_URL as string);
