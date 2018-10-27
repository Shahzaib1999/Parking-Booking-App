import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from "firebase";


var config = {
    apiKey: Your Api key,
    authDomain: "parking-booking-system-1999.firebaseapp.com",
    databaseURL: Your database url,
    projectId: "parking-booking-system-1999",
    storageBucket: "parking-booking-system-1999.appspot.com",
    messagingSenderId: your Id
};
firebase.initializeApp(config);

const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
