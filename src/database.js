import firebase from "firebase/app";
import "firebase/auth"
import "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBA4ai_gR73-t0M4UwfozSqZG4kFu7k3GA",
    authDomain: "podcastprioritizer.firebaseapp.com",
    databaseURL: "https://podcastprioritizer.firebaseio.com",
    projectId: "podcastprioritizer",
    storageBucket: "podcastprioritizer.appspot.com",
    messagingSenderId: "703854841662",
    appId: "1:703854841662:web:25566ffa1b31854dd7e66f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;