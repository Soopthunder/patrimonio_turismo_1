import React from 'react';

import { Link } from 'react-router-dom'

import styles from './NavigationIcons.module.css';
import NavigationIcon from './NavigationIcon/NavigationIcon';
import routes from '../../../config/routes'

const NavigationIcoms = (props) => {
    return (
        props.isAuth ? (
            <ul className={styles.NavigationIcons}>
                <NavigationIcon icon="fas fa-envelope">
                    Hola
                </NavigationIcon>
                <NavigationIcon icon="fas fa-cog">
                    <ul className={styles.UserMenu} >
                        <li>
                            <Link to={routes.privateRoutes.settings.path} > Configuración </Link>
                        </li>
                        <li>
                            <a href="/api/logout">Cerrar sesión</a>
                        </li>
                    </ul>
                </NavigationIcon>
            </ul>
        ) : null
    );

};

export default NavigationIcoms;