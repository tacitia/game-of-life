import { combineReducers } from 'redux';
import cellReducer from './cellReducer';

const appReducer = combineReducers({
  cellReducer,
});

export default appReducer;