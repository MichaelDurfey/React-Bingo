export const REQUEST_START = 'REQUEST_START';
export const RECEIVE_START = 'RECEIVE_START';
export const REQUEST_BALL = 'REQUEST_BALL';
export const RECEIVE_BALL = 'RECEIVE_BALL';
export const REQUEST_VERIFY = 'REQUEST_VERIFY';
export const RECEIVE_VERIFY = 'RECEIVE_VERIFY';
export const RESET_MESSAGE = 'RESET_MESSAGE';
export const RECEIVE_VERIFY_ERROR = 'RECEIVE_VERIFY_ERROR';

export const requestStart = () => ({
  type: REQUEST_START,
});

export const receiveStart = (board, boardHashes) => ({
  type: RECEIVE_START,
  boards: board,
  boardHashes,
});

export const requestBall = () => ({
  type: REQUEST_BALL
});

export const receiveBall = ball => ({
  type: RECEIVE_BALL, ball: ball.num,
});

export const requestVerify = player => ({
  type: REQUEST_VERIFY,
  payload: player,
});

export const receiveVerify = (player, winner) => ({
  type: RECEIVE_VERIFY,
  message: winner ? `${player.toUpperCase()} HAS WON!` : 'No Winner Yet!',
});

export const messageReset = message => ({
  type: RESET_MESSAGE,
  message,
});
