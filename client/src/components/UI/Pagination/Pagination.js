import React from 'react';

import styles from './Pagination.module.css'

export default ({ total, current, setCurrent }) => {
    const pages = []
    for (let i = 1; i <= total; i++)
        pages.push(<button className={ current === i && styles.selected } onClick={() => setCurrent(i)}>{i}</button>);

    return (
        <div className={styles.Pagination}>
            <div className="row justify-content-center my-2">
                {pages}
            </div>
            <div className="row justify-content-center my-2">
                <button
                    className="mx-2"
                    onClick={() => current > 1 && setCurrent(current - 1)}>
                    Anterior
                </button>
                <button
                    className="mx-2"
                    onClick={() => current < total && setCurrent(current + 1)} >
                    Siguiente
                </button>
            </div>
        </div>
    );
}
