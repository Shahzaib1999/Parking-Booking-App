import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from "firebase";


var config = {
    apiKey: "AIzaSyCBBZRDUL8hKZpTtG2c49np0q307H6GBlA",
    authDomain: "parking-booking-system-1999.firebaseapp.com",
    databaseURL: "https://parking-booking-system-1999.firebaseio.com",
    projectId: "parking-booking-system-1999",
    storageBucket: "parking-booking-system-1999.appspot.com",
    messagingSenderId: "899519094435"
};
firebase.initializeApp(config);

const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
