import { cellActionTypes } from '../actions/gameBoardActions';

const initialState = {
  liveCells: [{x: 10, y: 10}, {x: 20, y: 20}]
};
const cellReducer = (state = initialState, action) => {
  switch(action.type) {
    case cellActionTypes.ACTIVATE_CELL:
      return Object.assign({}, state, {
        liveCells: [ ...state.liveCells, action.payload.cellLocation ]
      });
    case cellActionTypes.ACTIVATE_CELL_BATCH:
      return Object.assign({}, state, {
        liveCells: [ ...state.liveCells, ...action.payload.cellLocations ]
      });
    case cellActionTypes.SET_LIVE_CELLS:
      return Object.assign({}, state, {
        liveCells: action.payload.liveCells
      });
    default:
      return state;
  }
};

export default cellReducer;