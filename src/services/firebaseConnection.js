import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDj_Okz5TNGGzTRc9yOULw2HFyE7Ezg3t4",
    authDomain: "cinemanews-67e3d.firebaseapp.com",
    projectId: "cinemanews-67e3d",
    storageBucket: "cinemanews-67e3d.appspot.com",
    messagingSenderId: "94315346712",
    appId: "1:94315346712:web:b68aa916dbd0c552a57c6d"
  };
  
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig) 
}

export default firebase