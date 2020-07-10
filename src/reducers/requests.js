import * as AC from '../actions/actionTypes';
import {updateObject} from './utitlites';

const initialState = {
  requests: [],
  myRequests: [],
  requestsLoading: false,
};

const setLoading = (state, action) => {
  return updateObject(state, {requestsLoading: action.loading});
};

const setMyRequests = (state, action) => {
  return updateObject(state, {myRequests: action.requests});
};

const setRequests = (state, action) => {
  return updateObject(state, {requests: action.requests});
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AC.SET_REQUESTS_LOADING:
      return setLoading(state, action);
    case AC.SET_REQUESTS:
      return setRequests(state, action);
    case AC.SET_MY_REQUESTS:
      return setMyRequests(state, action);
    default:
      return state;
  }
};

export default reducer;
