import firebase from 'firebase/app'
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyAx-fpBcVWrr62wlPYzAVTfr-W-dVeXlEY",
    authDomain: "react-meetups-41eb7.firebaseapp.com",
    databaseURL: "https://react-meetups-41eb7-default-rtdb.firebaseio.com",
    projectId: "react-meetups-41eb7",
    storageBucket: "react-meetups-41eb7.appspot.com",
    messagingSenderId: "535562248298",
    appId: "1:535562248298:web:8551554f8e3441370faa13"
}

// Initialize Firebase  
const firebaseDb = firebase.initializeApp(firebaseConfig)
  
export default firebaseDb.database().ref()