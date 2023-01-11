// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyAolu6iMo_ZbJKGatkES5meh4X-uQXCcaQ",
    authDomain: "drt2-62447.firebaseapp.com",
    databaseURL: "https://drt2-62447-default-rtdb.firebaseio.com",
    projectId: "drt2-62447",
    storageBucket: "drt2-62447.appspot.com",
    messagingSenderId: "837394038584",
    appId: "1:837394038584:web:c7358bdc8512ba1d41cbcd"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export default database;