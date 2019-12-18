import React, { useState } from 'react';

import { connect } from 'react-redux';

import styles from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = ({ isAuth, children }) => {
    const [showSideDrawer, setSideDrawer] = useState(false);

    return (
        <>
            {isAuth && <>
                <Toolbar
                    drawerToggleClicked={() => setSideDrawer(!showSideDrawer)}
                    isAuth={isAuth}
                />
                <SideDrawer
                    open={showSideDrawer}
                    closed={() => setSideDrawer(false)}
                    isAuth={isAuth}
                />
            </>}
            <main className={styles.Content}>
                {children}
            </main>
        </>
    );
}

const mapStateToProps = state => ({
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps)(Layout);