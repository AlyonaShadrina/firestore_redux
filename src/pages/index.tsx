import React, { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { useSelector } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';

import { firebaseAuth } from '../base/selectors';
import ROUTES from '../routes';

const Login = lazy(() => import('./Login'));
const Boards = lazy(() => import('./Boards'));
const BoardTasks = lazy(() => import('./BoardTasks'));


type PrivateRouteProps = {
    component: any;
    [x: string]: any;
};

const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {
    const { uid, isLoaded } = useSelector(firebaseAuth);

    if (!uid && isLoaded) {
        return <Redirect {...rest} to={ROUTES.login} />;
    }
    if (!isLoaded) {
        return <Dimmer active><Loader /></Dimmer>;
    }
    return (
        <Route
            {...rest}
            render={(props) => (
                <Component {...props} />
            )}
        />
    );
};

const Routes = () => (
    <Suspense fallback={<Dimmer active><Loader /></Dimmer>}>
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
