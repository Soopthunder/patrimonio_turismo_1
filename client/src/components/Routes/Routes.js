import React from 'react';

import { Route, Redirect, Switch } from 'react-router-dom';
import {connect} from 'react-redux';

import Routes from '../../config/routes';

const routesList = ({isAuth}) => {
    const routes = [];
    if (isAuth) {
        for (let route in Routes.privateRoutes) 
            routes.push(<Route key={Routes.privateRoutes[route]} {...Routes.privateRoutes[route]} />)
    } else {
        for (let route in Routes.publicRoutes) 
            routes.push(<Route key={Routes.privateRoutes[route]} {...Routes.publicRoutes[route]} />)
    }

    return (
        <Switch>
            {routes}
            {isAuth ? <Redirect to="/" /> : <Redirect to='/login' />}
        </Switch>
    );
}

const mapStateToProps = state => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps)(routesList);

