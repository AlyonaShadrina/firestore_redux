import React from 'react';
import { Provider } from 'react-redux';
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore' // <- needed if using firestore
import { createStore, combineReducers, compose } from 'redux'
import { ReactReduxFirebaseProvider, firebaseReducer } from 'react-redux-firebase'
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore'
import { BrowserRouter } from 'react-router-dom';

import Auth from "./base/auth/Auth";
import Boards from "./base/boards/Boards";
import { firebaseConfig } from './config';
import Routes from './pages';

const rrfConfig = {
    // userProfile: 'users',
    // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

firebase.initializeApp(firebaseConfig)

firebase.firestore() // <- needed if using firestore

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer // <- needed if using firestore
});

const initialState = {}

declare global {
    interface Window { devToolsExtension: any; }
}

const createStoreWithMiddleware = compose(
    // reduxFirebase(firebaseConfig, { userProfile: 'users' }),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : (f: any) => f
)(createStore)
const store = createStoreWithMiddleware(rootReducer, initialState)

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance // <- needed if using firestore
};

function App() {
  return (
      <Provider store={store}>
          <BrowserRouter>
              <ReactReduxFirebaseProvider {...rrfProps}>
                  <Routes />
              </ReactReduxFirebaseProvider>
          </BrowserRouter>
      </Provider>
  );
}

export default App;
