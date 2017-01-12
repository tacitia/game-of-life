import React from 'react'
import { render } from 'react-dom'

import { plug } from '../react-d3kit-adapter';
import PlainGameBoardVis from './GameBoardVis';

const GameBoardVis = plug('GameBoardVis', PlainGameBoardVis);

class GameBoard extends React.Component {

  constructor(props) {
    super(props);
    this.onCellClick = this.onCellClick.bind(this);
  }

  onCellClick(c) {
    console.log(c)
  }

  render() {
    return (
      <div>
        <GameBoardVis
          chartData={{
            liveCells: this.props.liveCells
          }}
          chartOptions={{
          }}
          onCellClick={(c) => this.onCellClick(c)}
        />
      </div>
    )
  }
}

export default WordTree;