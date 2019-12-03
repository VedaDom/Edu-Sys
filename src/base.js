import * as firebase from 'firebase/app';
import  'firebase/auth';
import  'firebase/firestore';

const config = {
    apiKey: "AIzaSyDaAqcftc40VzjLU8Bh60OTt4TFjA9xh5A",
    authDomain: "edusys-4849a.firebaseapp.com",
    databaseURL: "https://edusys-4849a.firebaseio.com",
    projectId: "edusys-4849a",
    storageBucket: "edusys-4849a.appspot.com",
    messagingSenderId: "618361865897",
    appId: "1:618361865897:web:3e7afdf10caac05bee0bb8",
    measurementId: "G-87JLXML76W"
  };

  const app = firebase.initializeApp(config);
  export default app;