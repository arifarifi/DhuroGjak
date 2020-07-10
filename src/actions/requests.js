import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import moment from 'moment';

import * as AC from './actionTypes';

export const setRequests = requests => {
  return {
    type: AC.SET_REQUESTS,
    requests,
  };
};

export const setMyRequests = requests => {
  return {
    type: AC.SET_MY_REQUESTS,
    requests,
  };
};

export const setRequestsLoading = loading => {
  return {
    type: AC.SET_REQUESTS_LOADING,
    loading,
  };
};

export const request = (user, location, group) => {
  const id = auth().currentUser.uid;

  return dispatch => {
    dispatch(setRequestsLoading(true));
    const requestsRef = database()
      .ref(`/requests`)
      .push();
    const requestId = requestsRef.key;

    const created_at = moment().format('DD MMM YYYY');

    const data = {
      user,
      location,
      group,
      active: true,
      id: requestId,
      created_at,
    };

    requestsRef.set(data).catch(error => {
      console.log({requestsErr: error});
      dispatch(setRequestsLoading(false));
    });
    database()
      .ref(`/users/${id}/requests/${requestId}`)
      .set(data)
      .then(() => {
        dispatch(setRequestsLoading(false));
      })
      .catch(error => {
        console.log({userRequestsErr: error});
        dispatch(setRequestsLoading(false));
      });
  };
};

export const updateRequests = requestId => {
  const id = auth().currentUser.uid;

  const updated_at = moment().format('DD MMM YYYY');

  return dispatch => {
    dispatch(setRequestsLoading(true));
    database()
      .ref(`/requests/${requestId}`)
      .remove();
    database()
      .ref(`/users/${id}/requests/${requestId}`)
      .update({active: false, updated_at})
      .then(() => dispatch(setRequestsLoading(false)))
      .catch(e => {
        dispatch(setRequestsLoading(false));
        console.log(e);
      });
  };
};

export const removeRequests = requestId => {
  const id = auth().currentUser.uid;

  return dispatch => {
    database()
      .ref(`/requests/${requestId}`)
      .remove();
    database()
      .ref(`/users/${id}/requests/${requestId}`)
      .remove();
  };
};

export const getRequests = () => {
  return dispatch => {
    dispatch(setRequestsLoading(true));
    database()
      .ref('/requests')
      .on('value', snapshot => {
        const requests = [];
        snapshot.forEach(data => {
          const dataWithId = {...data.val(), id: data.key};
          requests.push(dataWithId);
        });
        dispatch(setRequests(requests));
        dispatch(setRequestsLoading(false));
      });
  };
};

export const getMyRequests = () => {
  const id = auth().currentUser.uid;

  return dispatch => {
    dispatch(setRequestsLoading(true));
    database()
      .ref(`/users/${id}/requests`)
      .on('value', snapshot => {
        const requests = [];
        snapshot.forEach(data => {
          const dataWithId = {...data.val(), id: data.key};
          requests.push(dataWithId);
        });
        dispatch(setMyRequests(requests));
        dispatch(setRequestsLoading(false));
      });
  };
};
