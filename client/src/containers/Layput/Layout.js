import React, { useState } from 'react'
import styles from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = props => {
    const [ showSideDrawer, setSideDrawer ] = useState(false);

    return (
        <>
            <Toolbar
                drawerToggleClicked={() => setSideDrawer(!showSideDrawer)}
                isAuth={props.isAuth}
            />
            <SideDrawer
                open={ showSideDrawer}
                closed={() => setSideDrawer(false)}
                isAuth={props.isAuth}
            />
            <main className={styles.Content}>
                {props.children}
            </main>
        </>
    );
}

export default Layout;