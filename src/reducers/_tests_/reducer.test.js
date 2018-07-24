import reducer from '../index';
import * as actions from '../../actions';

describe('todos reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {}))
      .toEqual({
        isFetching: false,
        boards: [],
        lastBall: 0,
        played: [],
        playedHash: {},
        boardHashes: {},
        message: '',
      });
  });
  it('should handle REQUEST START', () => {
    expect(
      reducer({}, actions.requestStart())
    ).toEqual({ isFetching: true });
  });
  it('should handle receiveStart', () => {
    const board = [[1234]];
    const boardHashes = {
      1: true, 2: true, 3: true, 4: true,
    };
    expect(
      reducer({}, actions.receiveStart(board, boardHashes))
    ).toEqual({
      boardHashes: {
        1: true, 2: true, 3: true, 4: true
      },
      boards: [[1234]],
      isFetching: false,
      lastBall: 0,
      message: '',
      played: [],
      playedHash: {},
    });
  });
  it('should handle a new ball', () => {
    expect(
      reducer({ }, actions.receiveBall({ num: 4 }))
    ).toEqual({
      lastBall: 4,
      playedHash: { 4: true },
    });
    expect(
      reducer({
        lastBall: 25,
        playedHash: {
          1: true, 2: true, 3: true, 4: true,
        },
        played: [1, 2, 3, 4],
      }, actions.receiveBall({ num: 4 }))
    ).toEqual({
      lastBall: 4,
      playedHash: {
        1: true, 2: true, 3: true, 4: true
      },
      played: [1, 2, 3, 4, 25],
    });
  });
  it('should not change message if one exists already', () => {
    expect(
      reducer({ message: 'hi there!' }, actions.receiveVerify('player1', true))
    )
      .toEqual({ message: 'hi there!' });
  });
});
