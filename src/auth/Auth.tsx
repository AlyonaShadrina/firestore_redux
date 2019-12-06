import React from 'react'
import { useSelector } from 'react-redux'
import { useFirebase, isLoaded, isEmpty } from 'react-redux-firebase'

import { state } from '../types';

const LoginPage = () => {
    const firebase = useFirebase();
    const auth = useSelector((state: state) => state.firebase.auth);

    const login = () => firebase.login({
        email: 'alyon.shadrina@gmail.com',
        password: '12345678'
    });

    return (
        <div >
            <div>
                <h2>Auth</h2>
                {
                    !isLoaded(auth)
                        ? <span>Loading...</span>
                        : isEmpty(auth)
                        ? <button onClick={login}>Login</button>
                        : <pre>{JSON.stringify(auth, null, 2)}</pre>
                }
            </div>
        </div>
    )
};

export default LoginPage;
