import fetch from 'isomorphic-fetch';

import { API_URL } from '../constants/Enumerations';
import Cookies from 'js-cookie';

export const cellActionTypes = {
  SET_LIVE_CELLS: 'SET_LIVE_CELLS',
  ACTIVATE_CELL: 'ACTIVATE_CELL',
  DEACTIVATE_CELL: 'DEACTIVATE_CELL'
};

export const controlActionTypes = {
  START_GAME: 'START_GAME',
  PAUSE_GAME: 'PAUSE_GAME',
  CLEAR_GAME: 'CLEAR_GAME',
};

export function setLiveCells(liveCells) {
  return {
    type: cellActionTypes.SET_LIVE_CELLS,
    payload: {
      liveCells
    }
  }
}

export function activateCell(cell) {
  return {
    type: cellActionTypes.ACTIVATE_CELL,
    payload: {
      cell
    }
  }
}

export function deactivateCell(cell) {
  return {
    type: cellActionTypes.DEACTIVATE_CELL,
    payload: {
      cell
    }
  }
}

export function startGame() {
  return {
    type: controlActionTypes.START_GAME,
  }
}

export function pauseGame() {
  return {
    type: controlActionTypes.PAUSE_GAME,
  }
}

export function clearGame() {
  return {
    type: controlActionTypes.CLEAR_GAME,
  }
}