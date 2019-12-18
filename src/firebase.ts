import firebase from 'firebase/app';

import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig);

// enablePersistence for offline pwa
firebase.firestore().enablePersistence();

export default firebase;
