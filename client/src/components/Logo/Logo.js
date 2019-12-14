import React from 'react';
import PatrimonioLogo from '../../assets/img/logo.png';
import styles from './Logo.module.css';

const logo = (props) => (
    <div className = { styles.Logo }>
        <img src= {PatrimonioLogo} alt="Patrimonio Logo"/>
    </div>
);

export default logo;