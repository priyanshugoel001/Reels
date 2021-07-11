import firebase from "firebase/app"
import "firebase/auth"
import 'firebase/storage'
import 'firebase/firestore'
firebase.initializeApp(
    {
    apiKey: "AIzaSyD47NcnZ6uPWJX3specEQ5LL_0-1er_OzI",
    authDomain: "reel-faf75.firebaseapp.com",
    projectId: "reel-faf75",
    storageBucket: "reel-faf75.appspot.com",
    messagingSenderId: "936588711367",
    appId: "1:936588711367:web:779e5380491e800ddef5e2"
}
)
export const auth = firebase.auth();
const firestore = firebase.firestore();
export const database ={
    users:firestore.collection('users'),
    getCurrentTimeStamp : firebase.firestore.FieldValue.serverTimestamp
}
export const storage = firebase.storage();
// export default firebase;