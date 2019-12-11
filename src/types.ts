import { FirebaseReducer, FirestoreReducer } from 'react-redux-firebase';

export type StateType = {
    firebase: FirebaseReducer.Reducer;
    firestore: FirestoreReducer.Reducer;
};
