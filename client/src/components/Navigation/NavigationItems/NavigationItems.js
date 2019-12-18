import React from 'react';

import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Routes from '../../../config/routes'

const navigationItems = (props) => {
    return (
        props.isAuth ? (
            <ul className={styles.NavigationItems}>
                <NavigationItem link={Routes.privateRoutes.dashboard.path} exact >Dashboard</NavigationItem>
                <NavigationItem link={Routes.privateRoutes.mainContent.path} >Contenido</NavigationItem>
                <NavigationItem link={Routes.privateRoutes.destinations.path} >Destinos</NavigationItem>
            </ul>
        ) : null
    );

};


export default navigationItems;