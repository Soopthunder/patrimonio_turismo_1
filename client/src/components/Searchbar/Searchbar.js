import React from 'react';

import styles from './Searchbar.module.css'

export default ({ children, handleSearchValue, searchValue }) => (
    <div>
        <div className={styles.searchbar}>
            <input
                type="text"
                name="title"
                placeholder="Buscar"
                onChange={handleSearchValue}
                value={searchValue} />
            <i className="fas fa-search"></i>
        </div>
        <div>
            {children}
        </div>
    </div>
);


