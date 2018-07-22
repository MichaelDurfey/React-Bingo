const socket = new WebSocket('ws://localhost:8989');

socket.onopen = () => {
  console.log('websocket open');
};

socket.onmessage = (data) => {
  console.log('websocket client drawball event', data);
};

export default socket;
