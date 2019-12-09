import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { useFirebase, isEmpty } from 'react-redux-firebase'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { useFormik } from 'formik';

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
    }, [uid, isLoaded]);


    const login = () => firebase.login({
        email: 'alyon.shadrina@gmail.com',
        password: '12345678'
    }).then(() => {
        history.push('/boards');
    });

    const formik = useFormik({
        initialValues: {
            email: 'aaa',
        },
        onSubmit: values => firebase.login({
            email: 'alyon.shadrina@gmail.com',
            password: '12345678'
        }).then(() => {
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
