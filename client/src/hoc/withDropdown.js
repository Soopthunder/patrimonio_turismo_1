import React, { useState  } from 'react';
import styles from './withDropdown.module.css';

const WithDropdown = props => {
    const [show, setShow] = useState(props.show);

    let contentClass = styles.DropdownContent;
    if (show) contentClass += ' ' + styles.Show;

    return (
        <div>
            <div className={styles.DropdownHeader + " styles d-flex align-items center justify-content-between mb-4"}>
                <h3> {props.title} </h3>
                {!show ?
                    <i onClick={() => setShow(true)} className="fas fa-chevron-circle-down"></i>
                    :
                    <i onClick={() => setShow(false)} className="fas fa-chevron-circle-up"></i>
                }
            </div>
            <div className={contentClass} >
                {props.children}
            </div>
        </div>
    );
}

export default WithDropdown;
