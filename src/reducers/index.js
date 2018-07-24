import {
  RECEIVE_START,
  REQUEST_BALL,
  RECEIVE_BALL,
  REQUEST_VERIFY,
  RECEIVE_VERIFY,
  REQUEST_START,
  RESET_MESSAGE,
} from '../actions';
import { calculateBallUpdate } from './gameLogic';

const boardReducer = (state = {
  isFetching: false,
  boards: [],
  lastBall: 0,
  played: [],
  playedHash: {},
  boardHashes: {},
  message: '',
}, action) => {
  switch (action.type) {
    case REQUEST_START:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_START:
      return {
        isFetching: false,
        boards: action.boards,
        boardHashes: action.boardHashes,
        message: '',
        playedHash: {},
        played: [],
        lastBall: 0,
      };
    case REQUEST_BALL:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_BALL:
      return calculateBallUpdate(state, action.ball);
    case REQUEST_VERIFY:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_VERIFY:
      if (state.message) {
        return {
          ...state,
        };
      }
      return {
        ...state,
        message: action.message,
      };
    case RESET_MESSAGE:
      return {
        ...state,
        message: '',
      };
    case 'RECEIVE_VERIFY_ERROR':
      return {
        message: action.error
      };
    default:
      return state;
  }
};

// TO DO: PROPERLY HANDLE ERROR ACTIONS

export default boardReducer;
