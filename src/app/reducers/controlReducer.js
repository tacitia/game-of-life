import { controlActionTypes } from '../actions/gameBoardActions';

const initialState = {
  lifeCycleStatus: 'zero'
};

// This reducer manages two types of references: bookmarks and citations
// Bookmarks are associated with users regardless of the article; in other words,
// think of a user's bookmarks as the user's personal bibliography database
// Citations are associated with a pair of (userId, articleId)
const controlReducer = (state = initialState, action) => {
  switch(action.type) {
    case controlActionTypes.START_GAME:
      return Object.assign({}, state, {
        lifeCycleStatus: 'running'
      });
    case controlActionTypes.PAUSE_GAME:
      return Object.assign({}, state, {
        lifeCycleStatus: 'paused'
      });
    case controlActionTypes.CLEAR_GAME:
      return Object.assign({}, state, {
        lifeCycleStatus: 'zero'
      });      
    default:
      return state;
  }
};

export default controlReducer;