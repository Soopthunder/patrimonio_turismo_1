import React from 'react';
import styles from './Button.module.css';

const button = (props) => {
    const classes = [styles.Button, styles[props.type]] 
    if (props.form === 'circle') classes.push(styles.Circle)  
    return (
        <button
            style= {{width: props.width, height: props.height}}
            className={ classes.join(' ')}
            type={props.type !== "submit" ? 'button' : null}
            onClick={props.clicked}
            disabled={props.disabled} >
            {props.children}
        </button>
    );
};

export default button;