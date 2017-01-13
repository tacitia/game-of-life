import { cellActionTypes, controlActionTypes } from '../actions/gameBoardActions';

const initialState = {
  liveCells: []
//  liveCells: [{x: 10, y: 10}, {x: 20, y: 20},{x:11,y:10},{x:11, y:9},{x:9,y:10},{x:10,y:11}]
};
const cellReducer = (state = initialState, action) => {
  switch(action.type) {
    case cellActionTypes.ACTIVATE_CELL:
      return Object.assign({}, state, {
        liveCells: [ ...state.liveCells, action.payload.cell ]
      });
    case cellActionTypes.DEACTIVATE_CELL:
      return Object.assign({}, state, {
        liveCells: _.without(state.liveCells, action.payload.cell)
      });
    case cellActionTypes.SET_LIVE_CELLS:
      return Object.assign({}, state, {
        liveCells: action.payload.liveCells
      });
    case controlActionTypes.CLEAR_GAME:
      return Object.assign({}, state, {
        liveCells: []
      });  
    default:
      return state;
  }
};

export default cellReducer;
