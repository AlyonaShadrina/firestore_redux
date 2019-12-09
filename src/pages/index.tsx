import React, { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { useSelector } from "react-redux";

import { state } from "../types";
const Login = lazy(() => import('./Login'));
const Boards = lazy(() => import('./Boards'));
const BoardTasks = lazy(() => import('./BoardTasks'));

type privateRoute = {
    component: any;
    [x:string]: any;
}

const PrivateRoute = ({ component: Component, ...rest }: privateRoute) => {

    const { auth: { uid, isLoaded } } = useSelector((state: state) => state.firebase);

    if (!uid && isLoaded) {
        return <Redirect {...rest} to='/login' />
    } else if (!isLoaded) {
        return <span>Loading</span>
    } else {
        return (
            <Route {...rest} render={(props) => (
                <Component {...props} />
            )}
            />
        )
    }
};

const Routes = () => (
    <Suspense fallback={'loading'}>
        <Switch>
            <Route
                exact
                path={'/login'}
                component={Login}
            />
            <PrivateRoute
                exact
                path={'/boards'}
                component={Boards}
            />
            <PrivateRoute
                exact
                path={'/boards/:boardId/tasks'}
                component={BoardTasks}
            />
            <Redirect from="/" to="/boards" />
        </Switch>
    </Suspense>
);

export default Routes;