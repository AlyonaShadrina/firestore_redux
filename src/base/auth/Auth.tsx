import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { useFirebase } from 'react-redux-firebase'
import { Button, Form, Grid, Segment, Header } from 'semantic-ui-react'
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

    const formikLogin = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: (values: CreateUserCredentials) => {
            firebase.login(values).then(() => {
                history.push('/boards');
            })
        },
    });

    const formikSignup = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: (values: CreateUserCredentials) => {
            firebase.createUser(values).then(() => {
                history.push('/boards');
            })
        },
    });

    if (!isLoaded) {
        return <span>Loading...</span>
    }

    return (
        <Segment placeholder style={{ minHeight: '100vh' }}>
            <Grid columns={2} stackable divided>
                <Grid.Column>
                    <Header as='h2' textAlign='center'>Login</Header>
                    <Form onSubmit={formikLogin.handleSubmit}>
                        <Form.Field>
                            <label>Email</label>
                            <input
                                placeholder='email'
                                name="email"
                                type="email"
                                onChange={formikLogin.handleChange}
                                value={formikLogin.values.email}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <input
                                placeholder="password"
                                type="password"
                                name="password"
                                onChange={formikLogin.handleChange}
                                value={formikLogin.values.password}
                            />
                        </Form.Field>
                        <Button type='submit'>Login</Button>
                    </Form>
                </Grid.Column>

                <Grid.Column verticalAlign='middle'>
                    <Header as='h2' textAlign='center'>Sign up</Header>
                    <Form onSubmit={formikSignup.handleSubmit}>
                        <Form.Field>
                            <label>Email</label>
                            <input
                                placeholder='email'
                                name="email"
                                type="email"
                                onChange={formikSignup.handleChange}
                                value={formikSignup.values.email}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <input
                                placeholder="password"
                                type="password"
                                name="password"
                                onChange={formikSignup.handleChange}
                                value={formikSignup.values.password}
                            />
                        </Form.Field>
                        <Button type='submit'>Sign up</Button>
                    </Form>
                </Grid.Column>
            </Grid>
        </Segment>
    )
};

export default LoginPage;
