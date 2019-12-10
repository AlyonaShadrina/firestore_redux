import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { useFirebase } from 'react-redux-firebase'
import { Button, Form } from 'semantic-ui-react'
import { useFormik } from 'formik';

import { stateType } from '../../types';

type CreateUserCredentials = {
    email: string
    password: string
    signIn?: boolean
}

const LoginPage = () => {
    const firebase = useFirebase();
    const auth = useSelector((state: stateType) => state.firebase.auth);
    const history = useHistory();

    const { uid, isLoaded } = auth;

    useEffect(() => {
        if (uid && isLoaded) {
            history.push('/boards');
        }
    }, [uid, isLoaded, history]);


    const login = () => firebase.login({
        email: 'alyon.shadrina@gmail.com',
        password: '12345678'
    }).then(() => {
        history.push('/boards');
    });

    const formik = useFormik({
        initialValues: {
            email: 'aaa',
            password: '',
        },
        onSubmit: (values: CreateUserCredentials) => firebase.login(values).then(() => {
            history.push('/boards');
        }),
    });

    if (!isLoaded) {
        return <span>Loading...</span>
    }

    return (
        <div>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Field>
                    <label>Email</label>
                    <input placeholder='email' type="email" />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input placeholder='password' type="text" />
                </Form.Field>
                <Button type='submit' onClick={login}>Submit</Button>
            </Form>
        </div>
    )
};

export default LoginPage;
