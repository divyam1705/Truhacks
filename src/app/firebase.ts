import firebase from "firebase/compat/app";
import {getFirestore} from 'firebase/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCzfk3u-itC59HQ9h7FMa3tNUIgd8HpH9Y",
    authDomain: "taskmate-b97df.firebaseapp.com",
    projectId: "taskmate-b97df",
    storageBucket: "taskmate-b97df.appspot.com",
    messagingSenderId: "530421707779",
    appId: "1:530421707779:web:56ea3aa05edf3cb4870a36",
    measurementId: "G-9D2QVB1H5Z"
  };
export const app=firebase.initializeApp(firebaseConfig);
export const auth=firebase.auth();
export const db=getFirestore();