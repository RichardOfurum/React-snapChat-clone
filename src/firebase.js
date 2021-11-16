import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyA2mqLD0VGLtQ_uV-ErGGHDAWz7vWPrDsk",
    authDomain: "snapchat-clone-3ea0d.firebaseapp.com",
    projectId: "snapchat-clone-3ea0d",
    storageBucket: "snapchat-clone-3ea0d.appspot.com",
    messagingSenderId: "398306444561",
    appId: "1:398306444561:web:a9f9290ed17de57f3bf8b0"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export {db, auth, storage, provider};