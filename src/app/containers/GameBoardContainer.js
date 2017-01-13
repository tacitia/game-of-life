import { connect } from 'react-redux';

import { activateCell, deactivateCell, setLiveCells, startGame, pauseGame, clearGame } from '../actions/gameBoardActions';
import GameBoard from '../components/GameBoard';

const mapStateToProps = (state) => {
  return { 
    liveCells: state.cellReducer.liveCells,
    lifeCycleStatus: state.controlReducer.lifeCycleStatus
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCellSelect: (c) => {
      dispatch(activateCell(c));
    },
    onCellDeselect: (c) => {
      dispatch(deactivateCell(c));
    },
    onStartButtonClick: () => {
      dispatch(startGame());
    },
    onPauseButtonClick: () => {
      dispatch(pauseGame());
    },
    onClearButtonClick: () => {
      dispatch(clearGame());
    }
  };
};

const GameBoardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameBoard);

export default GameBoardContainer;