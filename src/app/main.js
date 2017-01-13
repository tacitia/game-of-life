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

var counter = 0;

const interval = setInterval(() => {
  if (store.getState().controlReducer.lifeCycleStatus === 'running') {
    if (counter > 10000) clearInterval(interval);
    const liveCells = store.getState().cellReducer.liveCells;
    const newLiveCells = computeCellUpdate(liveCells, 50, 50);
    store.dispatch(setLiveCells(newLiveCells));
    counter += 1;
  }
}, 1500);

function computeCellUpdate(liveCells, m, n) {
  const newLiveCells = [];
  // create a zero matrix
  const matrix = _.times(m, _.times(n, _.constant(0)));
/*
  for (var i = 0; i < m; i++){
    matrix[i] = [];
    for (var j = 0; j < n; j++){
      matrix[i][j] = 0;
    }	
  }
  */
  // set live position to be 1
  var lengthCells = liveCells.length;
  for (var i = 0; i < lengthCells; i++) {
    matrix[liveCells[i].x][liveCells[i].y] = 1;
  } 

  updateMatrix(matrix);

  for (var i =0; i < m; i++){
    for (var j = 0; j < n; j++){
      if (matrix[i][j] == 1) {
        newLiveCells.push({ x: i, y: j });
      }
    }
  }

  return newLiveCells;

  function updateMatrix(matrix){
    var dx = [1,1,1,0,0,-1,-1,-1];
    var dy = [1,0,-1,1,-1,1,0,-1];
    for (var i = 0; i < m; i++){
      for (var j = 0; j < n; j++){
        var lives = 0;
        for (var k = 0; k < 8; k++){
          var nx =  i + dx[k];
          var ny =  j + dy[k];
          if (nx < 0 || ny < 0 || nx >= m || ny >= n) {
            lives += 0;
          }
          else {
            lives += matrix[nx][ny] % 2;
          }
        }
        if (lives + matrix[i][j]== 3 || lives == 3) {
          matrix[i][j] |= 2;
        }
      }
    }

  	for (var i = 0; i < m; i++){
      for (var j = 0; j < n; j++){
        matrix[i][j]  >>= 1;
      }
    }
    return matrix;
  }
}
