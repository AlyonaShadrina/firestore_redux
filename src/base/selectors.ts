import { stateType } from "../types";

export const firebaseAuth = (state: stateType) => state.firebase.auth;
export const firestoreData = (state: stateType) => state.firestore.data;