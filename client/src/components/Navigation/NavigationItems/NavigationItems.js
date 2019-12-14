import React from 'react';

import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import routes from '../../../config/routes'

const navigationItems = (props) => {
    return (
        props.isAuth ? (
            <ul className={styles.NavigationItems}>
                <NavigationItem link={routes.privateRoutes.dashboard.path} exact >Dashboard</NavigationItem>
                <NavigationItem link={routes.privateRoutes.mainContent.path} >Contenido</NavigationItem>
                <NavigationItem link={routes.privateRoutes.destinations.path} >Destinos</NavigationItem>
            </ul>
        ) : null
    );

};


export default navigationItems;