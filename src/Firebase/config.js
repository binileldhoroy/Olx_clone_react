import firebase from "firebase";
import 'firebase/auth'
import 'firebase/firebase'
import 'firebase/storage'


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBp3wVfKluAxwy1jMyFObdpoF8VFLqqyls",
    authDomain: "olxclone-d239e.firebaseapp.com",
    projectId: "olxclone-d239e",
    storageBucket: "olxclone-d239e.appspot.com",
    messagingSenderId: "675954768745",
    appId: "1:675954768745:web:4d008f7cbae40da1501bf8",
    measurementId: "G-8ZHP930FRY"
  };

  export default firebase.initializeApp(firebaseConfig)