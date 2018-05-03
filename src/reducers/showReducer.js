import initialState from './initialState';
import {FETCH_SHOW, RECEIVE_SHOW} from '../actions/allActions';

/*
 * Reduces have switch cases depending on action type.
 */
export default function show(state = initialState.show, action) {
  let newState;
  switch (action.type) {
    case FETCH_SHOW:
      console.log('FETCH_SHOW Action')
      return action;
    case RECEIVE_SHOW:
      newState = action.show;
      console.log('RECEIVE_SHOW Action')
      return newState;
    default:
      return state;
  }
}
