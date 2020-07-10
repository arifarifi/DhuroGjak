import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import * as AC from './actionTypes';

export const setUser = user => {
  return {
    type: AC.SET_USER,
    user,
  };
};

export const setError = error => {
  return {
    type: AC.SET_ERROR,
    error,
  };
};

export const setAuthLoading = loading => {
  return {
    type: AC.SET_AUTH_LOADING,
    loading,
  };
};

export const register = (name, email, phone, gender, group, password) => {
  const user = {name, email, phone, gender, group, password};

  return dispatch => {
    dispatch(setAuthLoading(true));
    auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(data => {
        database()
          .ref(`/users/${data.user.uid}`)
          .set(user)
          .then(() => {
            dispatch(setUser(user));
          });
        dispatch(setError(''));
        dispatch(setAuthLoading(false));
      })
      .catch(error => {
        const message = error.message.substr(error.message.indexOf(' ') + 1);
        dispatch(setError(message));
        dispatch(setAuthLoading(false));

        console.error(error);
      });
  };
};

export const updateProfile = data => {
  const id = auth().currentUser.uid;

  return dispatch => {
    dispatch(setAuthLoading(true));
    database()
      .ref(`/users/${id}`)
      .update(data)
      .then(() => {
        dispatch(getUser());
        dispatch(setAuthLoading(false));
      })
      .catch(e => {
        dispatch(setAuthLoading(false));
        setError(e.nativeErrorMessage);
      });
  };
};

export const login = (email, password) => {
  return dispatch => {
    dispatch(setAuthLoading(true));
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(data => {
        database()
          .ref(`/users/${data.user.uid}`)
          .on('value', userData => {
            dispatch(setError(''));
            dispatch(setUser(userData));
            dispatch(setAuthLoading(false));
          })
          .catch(error => {
            dispatch(setAuthLoading(false));
            dispatch(setError(error.nativeErrorMessage));
            console.log({userDataError: error});
          });
      })
      .catch(error => {
        const message = error.message.substr(error.message.indexOf(' ') + 1);
        dispatch(setError(message));
        dispatch(setAuthLoading(false));
        console.log({error: error.error});
      });
  };
};

export const logout = () => {
  return dispatch => {
    dispatch(setAuthLoading(true));
    auth()
      .signOut()
      .then(() => {
        dispatch(setUser(null));
        dispatch(setAuthLoading(false));
        dispatch(setError(''));
      });
  };
};

export const getUser = () => {
  const id = auth().currentUser.uid;

  return dispatch => {
    database()
      .ref(`/users/${id}`)
      .on('value', userData => {
        dispatch(setUser(userData.val()));
      });
  };
};

export const changePassword = (oldPass, newPass) => {
  const email = auth().currentUser.email;

  return dispatch => {
    dispatch(setAuthLoading(true));
    auth()
      .signInWithEmailAndPassword(email, oldPass)
      .then(user => {
        auth()
          .currentUser.updatePassword(newPass)
          .then(() => {
            dispatch(setAuthLoading(false));
            dispatch(setError(''));
          })
          .catch(e => {
            dispatch(setError(e.nativeErrorMessage));
            dispatch(setAuthLoading(false));
          });
      })
      .catch(e => {
        dispatch(setError(e.nativeErrorMessage));
        dispatch(setAuthLoading(false));
      });
  };
};
