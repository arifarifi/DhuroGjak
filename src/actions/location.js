import * as AC from './actionTypes';

export const setLocation = location => {
  return {
    type: AC.SET_LOCATION,
    location,
  };
};
