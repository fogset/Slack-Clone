// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyClbu88CUMlNCvxMSXNpdkcKJO1KQyAOSo",
    authDomain: "slack-clone-20c58.firebaseapp.com",
    projectId: "slack-clone-20c58",
    storageBucket: "slack-clone-20c58.appspot.com",
    messagingSenderId: "1049010735506",
    appId: "1:1049010735506:web:e1bec5deb2bb8eaafb194b",
    measurementId: "G-9YRTWCT3N0"
};


if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
