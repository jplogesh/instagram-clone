import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = firebase.initializeApp( {
    apiKey: "AIzaSyBgihEYue5P_qXGI7aPOrC3JmJOVoMxcs4",
    authDomain: "instagram-clone-450cc.firebaseapp.com",
    databaseURL: "https://instagram-clone-450cc-default-rtdb.firebaseio.com",
    projectId: "instagram-clone-450cc",
    storageBucket: "instagram-clone-450cc.appspot.com",
    messagingSenderId: "243214278673",
    appId: "1:243214278673:web:4117e7fc7cd35124d591b0",
    measurementId: "G-BS2RYCWKRZ"
  });
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  export{ db , auth , storage };
