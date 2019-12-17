import firebase from 'firebase/app';

import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig);

firebase.firestore(); // <- needed if using firestore

export default firebase;
