import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useFirebase } from 'react-redux-firebase';
import {
    Button, Form, Grid, Segment, Header, Dimmer, Loader, Container, Icon,
} from 'semantic-ui-react';
import { useFormik } from 'formik';

import { showErrorToast } from '../../utils/showToast';
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

    const loginButton = useRef(null);

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
        onSubmit: (values: CreateUserCredentials) => {
            // 'any' - to avoid "Object is possibly null"
            if (document.activeElement === (loginButton as any).current.ref.current) {
                firebase
                    .login(values)
                    .then(redirectToBoards)
                    .catch((error) => showErrorToast(error.message));
            } else {
                firebase
                    .createUser(values)
                    .then(redirectToBoards)
                    .catch((error) => showErrorToast(error.message));
            }
        },
    });

    const loginWithGoogle = () => (
        firebase
            .login({ provider: 'google', type: 'popup' })
            .catch((error) => showErrorToast(error.message))
    );

    if (!isLoaded) {
        return <Dimmer active><Loader /></Dimmer>;
    }

    return (
        <Segment placeholder style={{ minHeight: '100vh' }}>
            <Header as="h2" textAlign="center">Login / Sign up</Header>
            <Grid columns={2} stackable divided reversed="mobile" as={Container}>
                <Grid.Column>
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
                        <Grid style={{ margin: 'auto', maxWidth: '15rem' }}>
                            <Button type="submit" primary inverted ref={loginButton}>Login</Button>
                            <Button type="submit" primary inverted>Sign up</Button>
                        </Grid>
                    </Form>
                </Grid.Column>
                <Grid.Column verticalAlign="middle">
                    <Button onClick={loginWithGoogle}>
                        <Icon name="google" />
                        Login with Google
                    </Button>
                </Grid.Column>
            </Grid>
        </Segment>
    );
};

export default LoginPage;
