import React from 'react';

import styles from './toast.module.css';

const Toast = ({ message, setMessage, index }) => {

    if (message) setTimeout(() => setMessage(''), 2350);

    const classes = message ? styles.Toast + ' ' + styles.Show : styles.Toast;
    const position = index ? 60 * (index + 1) - 30 + 'px' : '30px';
    return message ? (
        <div className={classes} style={{ bottom: position }} >{message}</div>
    ) : null;
};

export default Toast;
