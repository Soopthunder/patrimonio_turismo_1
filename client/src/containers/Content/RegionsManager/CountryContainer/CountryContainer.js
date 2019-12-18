import React from 'react';

import styles from './CountryContainer.module.css'

export default ({ name, deleteCountry }) => (
    <div className={styles.CountryContainer}>
        <span style={{marginRight: '10px'}}>{name}</span> 
        <button onClick={deleteCountry} >
            <i className="fas fa-times"></i>
        </button>
    </div>
);