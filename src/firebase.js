import firebase from "firebase";
require("firebase/firestore");
// import 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyD0fPJvTEQ8b-pNH4G-64cOB7TwEVS3JxA",
  authDomain: "projectmanager-d6172.firebaseapp.com",
  databaseURL: "https://projectmanager-d6172.firebaseio.com",
  projectId: "projectmanager-d6172",
  storageBucket: "projectmanager-d6172.appspot.com",
  messagingSenderId: "745476876144",
  appId: "1:745476876144:web:213845eaaf0e970abe51b5",
  measurementId: "G-5PWL3YB48B"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  var db = firebase.firestore();

  export const auth = firebase.auth();
  export const firestore = firebase.firestore;
  export default db;
