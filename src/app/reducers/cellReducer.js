import { cellActionTypes } from '../actions/gameBoardActions';

const initialState = {
  liveCells: []
};
const cellReducer = (state = initialState, action) => {
  switch(action.type) {
    case cellActionTypes.ACTIVATE_CELL:
      return Object.assign({}, state, {
        liveCells: [ ...state.liveCells, action.payload.cellLocation ]
      });
    default:
      return state;
  }
};

export default cellReducer;