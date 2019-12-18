import React from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import styles from './NavigationIcons.module.css';
import NavigationIcon from './NavigationIcon/NavigationIcon';
import Routes from '../../../config/routes';
import MessagesSummary from '../../MessagesSummary//MessagesSummary';
import { logout } from '../../../redux/actions';

const NavigationIcoms = ({ isAuth, onLogout, messages }) => {
    return (
        isAuth ? (
            <ul className={styles.NavigationIcons}>
                <NavigationIcon quantity={messages.length} icon="fas fa-envelope">
                    <div style={{ maxHeight: '350px' }}>
                        <MessagesSummary data={messages} />
                        <div className="d-flex justify-content-center py-1">
                            <Link className={styles.MessagesLink} to={Routes.privateRoutes.messages.path} > Ver todos </Link>
                        </div>
                    </div>
                </NavigationIcon>
                <NavigationIcon icon="fas fa-cog">
                    <ul className={styles.UserMenu} >
                        <li>
                            <Link to={Routes.privateRoutes.settings.path} > Configuración </Link>
                        </li>
                        <li >
                            <button onClick={onLogout} >Cerrar sesión</button>
                        </li>
                    </ul>
                </NavigationIcon>
            </ul>
        ) : null
    );

};

const mapStateToProps = state => ({
    isAuth: state.auth.isAuth,
    messages: state.messages.messages.filter(message => !message.readed)
});

const mapDispatchToProps = dispatch => ({
    onLogout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(NavigationIcoms);