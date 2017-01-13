import React from 'react'
import { render } from 'react-dom'
import { Button, ButtonToolbar } from 'react-bootstrap';

import { plug } from '../react-d3kit-adapter';
import PlainGameBoardVis from './GameBoardVis';

const GameBoardVis = plug('GameBoardVis', PlainGameBoardVis);

class GameBoard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      seedCells: []
    };
    this.onCellSelect = this.onCellSelect.bind(this);
    this.onCellDeselect = this.onCellDeselect.bind(this);
    this.onStartButtonClick = this.onStartButtonClick.bind(this);
    this.onPauseButtonClick = this.onPauseButtonClick.bind(this);
    this.onClearButtonClick = this.onClearButtonClick.bind(this);
  }

  onCellSelect(c) {
    this.props.onCellSelect(c);
  }

  onCellDeselect(c) {
    this.props.onCellDeselect(c);
  }

  onStartButtonClick(c) {
    this.props.onStartButtonClick();
  }

  onPauseButtonClick(c) {
    this.props.onPauseButtonClick();
  }  

  onClearButtonClick(c) {
    this.props.onClearButtonClick();
  }

  render() {
    return (
      <div className="game-board">
        <div className="control pull-right">
          <Button bsStyle="link" onClick={this.onStartButtonClick}><i className="glyphicon glyphicon-play" /></Button>
          <Button bsStyle="link" onClick={this.onPauseButtonClick}><i className="glyphicon glyphicon-pause" /></Button>
          <Button bsStyle="link" onClick={this.onClearButtonClick}><i className="glyphicon glyphicon-repeat" /></Button>
        </div>
        <GameBoardVis
          chartData={{
            liveCells: this.props.liveCells,
            lifeCycleStatus: this.props.lifeCycleStatus
          }}
          chartOptions={{
          }}
          onCellSelect={(c) => this.onCellSelect(c)}
          onCellDeselect={(c) => this.onCellDeselect(c)}
        />
      </div>
    )
  }
}

export default GameBoard;