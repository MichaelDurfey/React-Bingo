import * as actions from '../index';


describe('actions', () => {
  it('should create an action to verify a winner', () => {
    const player = 'Player2';
    const expected = {
      type: actions.REQUEST_VERIFY,
      payload: 'Player2',
    };
    expect(actions.requestVerify(player)).toEqual(expected);
  });
  it('should receive an action that verifies a winner', () => {
    const player = 'Player2';
    const winner = true;
    const expected = {
      type: actions.RECEIVE_VERIFY,
      message: 'PLAYER2 HAS WON!',
    };
    expect(actions.receiveVerify(player, winner)).toEqual(expected);
  });
  it('should receive an action that requests a ball', () => {
    const expected = {
      type: actions.REQUEST_BALL,
    };
    expect(actions.requestBall()).toEqual(expected);
  });
  it('should receive an action that requests start of game', () => {
    const expected = {
      type: actions.REQUEST_START
    };
    expect(actions.requestStart()).toEqual(expected);
  });
  it('should receive an action that receives start of game', () => {
    const board = [[1234]];
    const boardHashes = {
      1: true, 2: true, 3: true, 4: true,
    };
    const expected = {
      type: actions.RECEIVE_START,
      boards: [[1234]],
      boardHashes,
    };
    expect(actions.receiveStart(board, boardHashes)).toEqual(expected);
  });
  it('should receive an action that resets message', () => {
    const message = 'Hello There!';
    const expected = {
      type: actions.RESET_MESSAGE,
      message,
    };
    expect(actions.messageReset(message)).toEqual(expected);
  });
});
