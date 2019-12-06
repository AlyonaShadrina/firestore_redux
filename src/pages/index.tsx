import React, { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router';

const Login = lazy(() => import('./Login'));
const Boards = lazy(() => import('./Boards'));

const Routes = () => (
    <Suspense fallback={'loading'}>
        <Switch>
            <Route
                exact
                path={'/login'}
                component={Login}
            />
            <Route
                exact
                path={'/'}
                component={Boards}
            />
            {/*<PrivateRoute*/}
            {/*    path="/hint"*/}
            {/*    component={Hint}*/}
            {/*/>*/}
            {/*<PrivateRoute*/}
            {/*    exact*/}
            {/*    from='/'*/}
            {/*    component={RedirectToBots}*/}
            {/*/>*/}
        </Switch>
    </Suspense>
);

export default Routes;