import firebase from 'firebase';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDxmbpbCSkJViaI6l_yARvunjw2wYP2HUE',
  authDomain: 'message-app-a30e4.firebaseapp.com',
  projectId: 'message-app-a30e4',
  storageBucket: 'message-app-a30e4.appspot.com',
  messagingSenderId: '268511188686',
  appId: '1:268511188686:web:7e61f592d640ca726ca29f',
  measurementId: 'G-DRNW3XTFHB',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const githubProvider = new firebase.auth.GithubAuthProvider();
const storage = firebaseApp.storage();

export { auth, provider, facebookProvider, githubProvider, storage };
export default db;
