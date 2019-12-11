import { StateType } from '../types';

export const firebaseAuth = (state: StateType) => state.firebase.auth;
export const firestoreData = (state: StateType) => state.firestore.data;
