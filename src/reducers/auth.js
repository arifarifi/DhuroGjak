import * as AC from '../actions/actionTypes';
import {updateObject} from './utitlites';

const initialState = {
  user: null,
  error: '',
  authLoading: false,
};

const setUser = (state, action) => {
  return updateObject(state, {user: action.user});
};

const setError = (state, action) => {
  return updateObject(state, {error: action.error});
};

const setLoading = (state, action) => {
  return updateObject(state, {authLoading: action.loading});
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AC.SET_USER:
      return setUser(state, action);
    case AC.SET_ERROR:
      return setError(state, action);
    case AC.SET_AUTH_LOADING:
      return setLoading(state, action);
    default:
      return state;
  }
};

export default reducer;
