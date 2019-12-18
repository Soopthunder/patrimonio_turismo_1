import React, { useState } from 'react';
import styles from './NavigationIcon.module.css';

const NavigationIcon = props => {

    const [visible, setVisible] = useState(false);

    let s = { display: 'none' }
    if (visible) s = { display: 'block' };

    return (
        <li className={styles.Icon}>
            <div
                className={styles.IconContainer}
                onMouseOver={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}>
                <div>
                    <i className={props.icon} />
                </div>
            </div>
            {props.quantity ?
                <div className={styles.QuantityContainer}>
                    {props.quantity}
                </div> : null}
            <div
                className={styles.Dropdown}
                style={s}
                onMouseLeave={() => setVisible(false)}
                onMouseOver={() => setVisible(true)} >
                {props.children}
            </div>
        </li>
    );
};

export default NavigationIcon;