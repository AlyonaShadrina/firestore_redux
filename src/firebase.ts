import firebase from 'firebase/app';

import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig);

// enablePersistence for offline pwa
// enablePersistence will crash tests
if (process.env.NODE_ENV === 'production') {
    firebase.firestore().enablePersistence();
} else {
    firebase.firestore();
}

export default firebase;
