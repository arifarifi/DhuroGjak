import * as AC from '../actions/actionTypes';
import {updateObject} from './utitlites';

const initialState = {
  location: null,
};

const setLocation = (state, action) => {
  return updateObject(state, {location: action.location});
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AC.SET_LOCATION:
      return setLocation(state, action);
    default:
      return state;
  }
};

export default reducer;
