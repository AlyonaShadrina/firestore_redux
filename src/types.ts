import { FirebaseReducer, FirestoreReducer } from 'react-redux-firebase'

export type stateType = {
    firebase: FirebaseReducer.Reducer,
    firestore: FirestoreReducer.Reducer,
};
