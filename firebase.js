import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDo0bngcQw5xwTuAFGgPjcsT26WhnwuWMI",
    authDomain: "whatsapp-2-22f68.firebaseapp.com",
    projectId: "whatsapp-2-22f68",
    storageBucket: "whatsapp-2-22f68.appspot.com",
    messagingSenderId: "425611079730",
    appId: "1:425611079730:web:05ff40c86a9c5235458c2b",
    measurementId: "G-VL8L4WTQ4Y"
};

const app = !firebase.apps.length 
    ? firebase.initializeApp(firebaseConfig) 
    : firebase.app()

const db = app.firestore();

const auth= app.auth();

const provider= new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };