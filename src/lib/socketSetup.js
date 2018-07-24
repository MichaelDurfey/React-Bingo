import { receiveBall } from '../actions';


const setupSocket = (dispatch) => {
  const socketConnection = new WebSocket('ws://localhost:3000');
  socketConnection.onopen = () => {
    console.log('websocket open');
  };
  socketConnection.onmessage = ({ data }) => {
    const res = JSON.parse(data);
    if (res.num) {
      dispatch(receiveBall(res));
    } else if (res.winner) {
      dispatch({ type: 'REQUEST_RESET' });
    } else {
      // socket disconnected
      console.log(res);
    }
  };
  return socketConnection;
};

export default setupSocket;
