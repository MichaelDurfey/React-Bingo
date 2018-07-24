import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import socketSetup from '../lib/socketSetup';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer,
  applyMiddleware(sagaMiddleware));

const socket = socketSetup(store.dispatch);

sagaMiddleware.run(rootSaga, { socket });

export default store;
