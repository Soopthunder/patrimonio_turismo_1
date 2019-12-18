import React, { useState } from 'react';
import styles from './withDropdown.module.css';

const WithDropdown = props => {
    const [show, setShow] = useState(props.show);

    let contentClass = styles.DropdownContent;
    if (show) contentClass += ' ' + styles.Show;

    return (
        <div className="my-3">
            <div
                onClick={show ? () => setShow(false) : () => setShow(true)}
                className={styles.DropdownHeader + " styles d-flex align-items center justify-content-between"}>
                <h3> {props.title} </h3>
                {!show ?
                    <i className="fas fa-chevron-circle-down"></i>
                    :
                    <i className="fas fa-chevron-circle-up"></i>
            }
            </div>
        <div className={contentClass} >
            {props.children}
        </div>
        </div >
    );
}

export default WithDropdown;
