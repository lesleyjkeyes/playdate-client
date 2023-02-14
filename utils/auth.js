import firebase from 'firebase/app';
import 'firebase/auth';

const checkUser = (uid) => new Promise((resolve, reject) => {
  fetch('http://127.0.0.1:8000/checkuser', {
    method: 'POST',
    body: JSON.stringify({
      uid,
    }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const registerUser = (user, userInfo) => new Promise((resolve, reject) => {
  const userObj = {
    uid: user.uid,
    first_name: userInfo?.firstName,
    last_name: userInfo?.lastName,
    about: userInfo?.about,
    profile_image: user.fbUser.photoURL,
    email: user.fbUser.email,
    city: userInfo?.city,
    state: userInfo?.state,
    country: userInfo?.country,
  };
  fetch('http://127.0.0.1:8000/register', {
    method: 'POST',
    body: JSON.stringify(userObj),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const signIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const signOut = () => {
  firebase.auth().signOut();
};

export {
  signIn, //
  signOut,
  checkUser,
  registerUser,
};
