import { createStore as reduxCreateStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

const loggerMiddleware = createLogger();

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
)(reduxCreateStore);

export default function createStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
