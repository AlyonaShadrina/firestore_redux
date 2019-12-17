import { FirebaseReducer, FirestoreReducer } from 'react-redux-firebase';

export type StateType = {
    firebase: FirebaseReducer.Reducer;
    firestore: FirestoreReducer.Reducer;
};

export type EditBoardType = {
    name: string;
    description: string;
};

export type EditTaskType = {
    name: string;
    description: string;
};

export type BoardType = EditBoardType & {
    uid: string;
    id?: string;
};

export type TaskType = EditTaskType & {
    uid: string;
    id?: string;
};
