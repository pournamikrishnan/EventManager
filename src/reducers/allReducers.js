import {combineReducers} from 'redux';
import stuff from './stuffReducer';

/*
 * Redux state management :
 * Reducer combined.
 */
const rootReducer = combineReducers({
  stuff
});

export default rootReducer;
