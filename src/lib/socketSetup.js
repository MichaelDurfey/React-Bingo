const socketConnection = new WebSocket('ws://localhost:3000');
import socketControllers from './socketControllers';

socketConnection.onopen = () => {
  console.log('websocket open');
};

socketConnection.onmessage = (data) => {
  console.log('websocket client drawball event', data);
};

export default socketConnection;
