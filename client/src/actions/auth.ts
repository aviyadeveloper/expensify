import { firebase, googleAuthProvider } from '../firebase/firebase';

export const login = (uid: String | undefined) => {
  return {
    type: 'LOG_IN',
    uid
  };
};

export const runLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  };
};

export const logout = () => {
  return {
    type: 'LOG_OUT'
  };
};
export const runLogout = () => {
  console.log('run log out');
  return () => {
    return firebase.auth().signOut();
  };
};
