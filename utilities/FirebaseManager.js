import firebase from 'firebase/app'
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAjMmXUZ5i1M-vMItRTQjYIDXRXJkyXirU",
    authDomain: "geocaching-894bf.firebaseapp.com",
    databaseURL: "https://geocaching-894bf.firebaseio.com",
    projectId: "geocaching-894bf",
    storageBucket: "geocaching-894bf.appspot.com",
    messagingSenderId: "527651601040",
    appId: "1:527651601040:web:9651c73c7172a0d5783615"
  }
 
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
  }

export const db = firebase.firestore()