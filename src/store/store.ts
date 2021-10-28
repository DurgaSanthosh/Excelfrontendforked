import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "./Reducers/rootReducer";
import thunk from 'redux-thunk';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const INITIAL_STATE = {};

const store = createStore(
  rootReducer,
  INITIAL_STATE,
  composeEnhancers(applyMiddleware(thunk)),
);

export default store;
