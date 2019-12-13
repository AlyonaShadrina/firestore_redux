import { FirebaseReducer, FirestoreReducer } from 'react-redux-firebase';

export type StateType = {
    firebase: FirebaseReducer.Reducer;
    firestore: FirestoreReducer.Reducer;
};

export type BoardType = {
    name: string;
    description: string;
    uid: string;
};

export type TaskType = {
    name: string;
    description: string;
    uid: string;
};
