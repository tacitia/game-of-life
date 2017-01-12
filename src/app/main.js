/*global require:true*/
import 'babel-polyfill';
import d3 from 'd3';
import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import { setLiveCells } from './actions/gameBoardActions';
import App from './components/App';
import appReducer from './reducers';

const logger = createLogger();
const store = createStore(
  appReducer,
  applyMiddleware(thunk, logger)
);

ReactDOM.render(
  (
    <div>
      <Provider store={store}>
        <App />
      </Provider>
    </div>
  ),
  document.getElementById('app')
);

setInterval(() => {
  const liveCells = store.getState().cellReducer.liveCells;
  console.log(liveCells)
  const newLiveCells = computeCellUpdate(liveCells);
  console.log(newLiveCells)
  store.dispatch(setLiveCells(newLiveCells));
}, 1000);

function computeCellUpdate(liveCells) {
  const newLiveCells = [];
  return newLiveCells;
}