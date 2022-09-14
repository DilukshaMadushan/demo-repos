import firebase from 'firebase';


const config = {
    apiKey: "AIzaSyBClWxkSBU3SBR_zyaI45Yeby7pAesFK-8",
    authDomain: "kiyanna-firebase.firebaseapp.com",
    databaseURL: "https://kiyanna-firebase.firebaseio.com",
    projectId: "kiyanna-firebase",
    storageBucket: "kiyanna-firebase.appspot.com",
    messagingSenderId: "6079676082",
    appId: "1:6079676082:web:4be67f11927dd8376ed3ab"
}

firebase.initializeApp(config);
export default firebase