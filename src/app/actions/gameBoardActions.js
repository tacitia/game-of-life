import fetch from 'isomorphic-fetch';

import { API_URL } from '../constants/Enumerations';
import Cookies from 'js-cookie';

export const cellActionTypes = {
  ACTIVATE_CELL: 'ACTIVATE_CELL',
  SET_LIVE_CELLS: 'SET_LIVE_CELLS'
};

export function activateCell(cellLocation) {
  return {
    type: cellActionTypes.ACTIVATE_CELL,
    payload: {
      cellLocation
    }
  }
}
export function setLiveCells(liveCells) {
  return {
    type: cellActionTypes.SET_LIVE_CELLS,
    payload: {
      liveCells
    }
  }
}