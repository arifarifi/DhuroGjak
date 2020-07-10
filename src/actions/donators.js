import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import moment from 'moment';

import * as AC from './actionTypes';

export const setDonators = donators => {
  return {
    type: AC.SET_DONATORS,
    donators,
  };
};

export const setMyDonations = donations => {
  return {
    type: AC.SET_MY_DONATIONS,
    donations,
  };
};

export const setDonatorsLoading = loading => {
  return {
    type: AC.SET_DONATORS_LOADING,
    loading,
  };
};

export const donate = (user, location, group) => {
  const id = auth().currentUser.uid;

  return dispatch => {
    dispatch(setDonatorsLoading(true));
    const donatorsRef = database()
      .ref(`/donators`)
      .push();
    const donationId = donatorsRef.key;

    const created_at = moment().format('DD MMM YYYY');

    const data = {
      user,
      location,
      group,
      active: true,
      id: donationId,
      created_at,
    };

    donatorsRef.set(data).catch(error => {
      console.log({donatorsErr: error});
      dispatch(setDonatorsLoading(false));
    });
    database()
      .ref(`/users/${id}/donations/${donationId}`)
      .set(data)
      .then(() => {
        dispatch(setDonatorsLoading(false));
      })
      .catch(error => {
        console.log({userDonationErr: error});
        dispatch(setDonatorsLoading(false));
      });
  };
};

export const updateDonations = donationId => {
  const id = auth().currentUser.uid;

  const updated_at = moment().format('DD MMM YYYY');

  return dispatch => {
    dispatch(setDonatorsLoading(true));
    database()
      .ref(`/donators/${donationId}`)
      .remove();
    database()
      .ref(`/users/${id}/donations/${donationId}`)
      .update({active: false, updated_at})
      .then(() => dispatch(setDonatorsLoading(false)))
      .catch(e => {
        dispatch(setDonatorsLoading(false));
        console.log(e);
      });
  };
};

export const removeDonations = donationId => {
  const id = auth().currentUser.uid;

  return dispatch => {
    database()
      .ref(`/donators/${donationId}`)
      .remove();
    database()
      .ref(`/users/${id}/donations/${donationId}`)
      .remove();
  };
};

export const getDonators = () => {
  return dispatch => {
    dispatch(setDonatorsLoading(true));
    database()
      .ref('/donators')
      .on('value', snapshot => {
        const donators = [];
        snapshot.forEach(data => {
          const dataWithId = {...data.val(), id: data.key};
          donators.push(dataWithId);
        });
        dispatch(setDonators(donators));
        dispatch(setDonatorsLoading(false));
      });
  };
};

export const getMyDonations = () => {
  const id = auth().currentUser.uid;

  return dispatch => {
    dispatch(setDonatorsLoading(true));
    database()
      .ref(`/users/${id}/donations`)
      .on('value', snapshot => {
        const donations = [];
        snapshot.forEach(data => {
          const dataWithId = {...data.val(), id: data.key};
          donations.push(dataWithId);
        });
        dispatch(setMyDonations(donations));
        dispatch(setDonatorsLoading(false));
      });
  };
};
