import {combineReducers} from 'redux';
import show from './showReducer';

/*
 * Redux state management :
 * Reducer combined.
 */
const rootReducer = combineReducers({
  show
});

export default rootReducer;
