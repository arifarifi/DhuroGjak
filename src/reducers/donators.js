import * as AC from '../actions/actionTypes';
import {updateObject} from './utitlites';

const initialState = {
  donators: [],
  myDonations: [],
  donatorsLoading: false,
};

const setLoading = (state, action) => {
  return updateObject(state, {donatorsLoading: action.loading});
};

const setMyDonations = (state, action) => {
  return updateObject(state, {myDonations: action.donations});
};

const setDonators = (state, action) => {
  return updateObject(state, {donators: action.donators});
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AC.SET_DONATORS_LOADING:
      return setLoading(state, action);
    case AC.SET_DONATORS:
      return setDonators(state, action);
    case AC.SET_MY_DONATIONS:
      return setMyDonations(state, action);
    default:
      return state;
  }
};

export default reducer;
