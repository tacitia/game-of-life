import { combineReducers } from 'redux';
import cellReducer from './cellReducer';
import controlReducer from './controlReducer';

const appReducer = combineReducers({
  cellReducer,
  controlReducer
});

export default appReducer;