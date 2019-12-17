import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useFirebase } from 'react-redux-firebase';
import {
    Button, Form, Grid, Segment, Header, Dimmer, Loader,
} from 'semantic-ui-react';
import { useFormik } from 'formik';

import { firebaseAuth } from '../selectors';
import ROUTES from '../../routes';


type CreateUserCredentials = {
    email: string;
    password: string;
    signIn?: boolean;
};

const LoginPage = () => {
    const firebase = useFirebase();
    const auth = useSelector(firebaseAuth);
    const history = useHistory();

    const { uid, isLoaded } = auth;

    const redirectToBoards = () => {
        history.push(ROUTES.boards);
    };

    useEffect(() => {
        if (uid && isLoaded) {
            history.push(ROUTES.boards);
        }
    }, [uid, isLoaded, history]);

    const formikLogin = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: (values: CreateUserCredentials) => firebase.login(values).then(redirectToBoards),
    });

    const formikSignup = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: (values: CreateUserCredentials) => (
            firebase.createUser(values).then(redirectToBoards)
        ),
    });

    if (!isLoaded) {
        return <Dimmer active><Loader /></Dimmer>;
    }

    return (
        <Segment placeholder style={{ minHeight: '100vh' }}>
            <Grid columns={2} stackable divided>
                <Grid.Column>
                    <Header as="h2" textAlign="center">Login</Header>
                    <Form onSubmit={formikLogin.handleSubmit}>
                        <Form.Field>
                            <label htmlFor="loginEmail">Email</label>
                            <input
                                id="loginEmail"
                                placeholder="email"
                                name="email"
                                type="email"
                                onChange={formikLogin.handleChange}
                                value={formikLogin.values.email}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="loginPassword">Password</label>
                            <input
                                id="loginPassword"
                                placeholder="password"
                                type="password"
                                name="password"
                                onChange={formikLogin.handleChange}
                                value={formikLogin.values.password}
                            />
                        </Form.Field>
                        <Button type="submit" primary>Login</Button>
                    </Form>
                </Grid.Column>

                <Grid.Column verticalAlign="middle">
                    <Header as="h2" textAlign="center">Sign up</Header>
                    <Form onSubmit={formikSignup.handleSubmit}>
                        <Form.Field>
                            <label htmlFor="signupEmail">Email</label>
                            <input
                                id="signupEmail"
                                placeholder="email"
                                name="email"
                                type="email"
                                onChange={formikSignup.handleChange}
                                value={formikSignup.values.email}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="signupPassword">Password</label>
                            <input
                                id="signupPassword"
                                placeholder="password"
                                type="password"
                                name="password"
                                onChange={formikSignup.handleChange}
                                value={formikSignup.values.password}
                            />
                        </Form.Field>
                        <Button type="submit" primary>Sign up</Button>
                    </Form>
                </Grid.Column>
            </Grid>
        </Segment>
    );
};

export default LoginPage;
