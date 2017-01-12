import { connect } from 'react-redux';

import { activateCell } from '../actions/gameBoardActions';
import GameBoard from '../components/GameBoard';

const mapStateToProps = (state) => {
  return { 
    liveCells: state.cellReducer.liveCells
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    cellActivated: (cellLocation) => {
      dispatch(activateCell(cellLocation));
    }
  };
};

const GameBoardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameBoard);

export default GameBoardContainer;