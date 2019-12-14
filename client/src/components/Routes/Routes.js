import React from 'react';

import { Route, Redirect, Switch } from 'react-router-dom';

import Routes from '../../config/routes';
import Login from '../../containers/Login/Login';

const routesList = props => {
    const routes = [];
    if (props.isAuth) {
        for (let route in Routes.privateRoutes) routes.push(<Route {...Routes.privateRoutes[route]} />)
    } else {
        routes.push(<Route path='/login' render={routerProps => <Login {...routerProps} setAuth={props.setAuth} />} />)
    }

    return (
        <Switch>
            {routes}
            {props.isAuth ? <Redirect to="/" /> : <Redirect to='/login' />}
        </Switch>
    );
}

export default routesList;

