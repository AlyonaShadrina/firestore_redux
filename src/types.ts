import { FirebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'

export type stateType = {
    firebase: FirebaseReducer.Reducer,
    firestore: any,
};
