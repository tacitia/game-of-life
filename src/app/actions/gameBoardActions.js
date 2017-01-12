import fetch from 'isomorphic-fetch';

import { API_URL } from '../constants/Enumerations';
import Cookies from 'js-cookie';

export const cellActionTypes = {
  ACTIVATE_CELL: 'ACTIVATE_CELL',
};

export function activateCell(cellLocation) {
  return {
    type: cellActionTypes.ACTIVATE_CELL,
    payload: {
      cellLocation
    }
  }
}