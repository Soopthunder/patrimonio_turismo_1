import React from 'react';

import styles from './Input.module.css';

const input = ( { touched, invalid, shouldValidate, elementConfig, changed, value, label, elementType } ) => {
    let inputElement = null;
    const inputClasses = [styles.InputElement];

    if (invalid && shouldValidate && touched) {
        inputClasses.push(styles.Invalid);
    }

    switch ( elementType ) {
        case ( 'input' ):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...elementConfig}
                value={ elementConfig.type !== 'file' ? value : null }
                onChange={changed} />;
            break;
        case ( 'textarea' ):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...elementConfig}
                value={value}
                onChange={changed} />;
            break;
        case ( 'select' ):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={value }
                    onChange={changed}>
                    {elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...elementConfig}
                value={value}
                onChange={changed} />;
    }

    return (
        <div className={styles.Input}>
            <label htmlFor={elementConfig.id} className={styles.Label}>{label}</label>
            {inputElement}
        </div>
    );

};

export default input;