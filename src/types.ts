import { FirebaseReducer, FirestoreReducer } from 'react-redux-firebase';

export type StateType = {
    firebase: FirebaseReducer.Reducer;
    firestore: FirestoreReducer.Reducer;
};

export type EditBoardType = {
    name: string;
    description: string;
    sharedWith: string;
};

export type EditTaskType = {
    name: string;
    description: string;
    code?: string;
    language?: string;
};

export type BoardType = EditBoardType & {
    uid: string;
    id?: string;
    author?: string;
};

export type TaskType = EditTaskType & {
    uid: string;
    id?: string;
    author?: string;
};
