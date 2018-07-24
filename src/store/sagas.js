import {
  takeEvery,
  put,
  call,
} from 'redux-saga/effects';
import { delay } from 'redux-saga';
import {
  requestStart,
  receiveStart,
  receiveBall,
  receiveVerify,
  messageReset
} from '../actions';
import { drawBall, gameStart, verifyWinner } from '../lib/httpHelpers';

function buildBoardHashes(board) {
  const boardHashes = Object.entries(board)
    .reduce((acc, entry) => {
      acc[entry[0]] = entry[1]
        .reduce((arr, curr) => arr.concat(curr))
        .reduce((hash, curr) => ({ ...hash, [curr]: true }), {});
      return acc;
    }, {});
  return boardHashes;
}

function* workerStart() {
  try {
    const { data } = yield gameStart();
    const boardHashes = buildBoardHashes(data);
    yield put(receiveStart(data, boardHashes));
  } catch (error) {
    yield put({ type: 'START_FAILURE', error });
  }
}

function* workerDraw() {
  try {
    const { data } = yield drawBall();
    yield put(receiveBall(data));
  } catch (error) {
    yield put({ type: 'RECEIVE_BALL_ERROR', error });
  }
}


function* workerVerify(action) {
  try {
    const { data } = yield verifyWinner(action.payload);
    yield put(receiveVerify(data.player, data.winner));
    yield call(delay, 2000);
    yield put(messageReset(''));
  } catch (error) {
    yield put({ type: 'RECEIVE_VERIFY_ERROR', error });
  }
}

function* workerReset() {
  yield call(delay, 2000);
  yield put(requestStart());
}

export default function* rootSaga() {
  yield takeEvery('REQUEST_START', workerStart);
  yield takeEvery('REQUEST_BALL', workerDraw);
  yield takeEvery('REQUEST_VERIFY', workerVerify);
  yield takeEvery('REQUEST_RESET', workerReset);
}
