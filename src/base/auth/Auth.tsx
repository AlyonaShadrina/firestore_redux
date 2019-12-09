import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { useFirebase, isEmpty } from 'react-redux-firebase'

import { state } from '../../types';


const LoginPage = () => {
    const firebase = useFirebase();
    const auth = useSelector((state: state) => state.firebase.auth);
    const history = useHistory();

    const { uid, isLoaded } = auth;

    useEffect(() => {
        if (uid && isLoaded) {
            history.push('/boards');
        }
    }, [uid, isLoaded])


    const login = () => firebase.login({
        email: 'alyon.shadrina@gmail.com',
        password: '12345678'
    }).then(() => {
        history.push('/boards');
    });

    return (
        <div >
            <div>
                <h2>Auth</h2>
                {
                    !isLoaded
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
