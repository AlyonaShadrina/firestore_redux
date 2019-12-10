import React, { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { useSelector } from "react-redux";

import { firebaseAuth } from '../base/selectors';
import ROUTES from "../routes";
const Login = lazy(() => import('./Login'));
const Boards = lazy(() => import('./Boards'));
const BoardTasks = lazy(() => import('./BoardTasks'));


type privateRoute = {
    component: any;
    [x:string]: any;
}

const PrivateRoute = ({ component: Component, ...rest }: privateRoute) => {

    const { uid, isLoaded } = useSelector(firebaseAuth);

    if (!uid && isLoaded) {
        return <Redirect {...rest} to={ROUTES.login} />
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
                path={ROUTES.login}
                component={Login}
            />
            <PrivateRoute
                exact
                path={ROUTES.boards}
                component={Boards}
            />
            <PrivateRoute
                exact
                path={ROUTES.dynamic.boardTasks()}
                component={BoardTasks}
            />
            <Redirect from="/" to={ROUTES.boards} />
        </Switch>
    </Suspense>
);

export default Routes;