import {combineReducers} from 'redux';

import location from './location';
import donators from './donators';
import auth from './auth';
import requests from './requests';

export default combineReducers({
  location,
  donators,
  auth,
  requests,
});
