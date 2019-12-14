import React from 'react';

import styles from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import NavigationIcons from '../NavigationIcons/NavigationIcons';


const toolbar = (props) => (
    <header className={styles.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked} />
        <nav className={styles.DesktopOnly}>
            <div className={styles.Logo}>
                <Logo />
            </div>
            <NavigationItems isAuth={props.isAuth} closeSideDrawer={props.closeSideDrawer} />
        </nav>
        <nav>
            <NavigationIcons isAuth={props.isAuth} />
        </nav>
    </header>
);

export default toolbar;