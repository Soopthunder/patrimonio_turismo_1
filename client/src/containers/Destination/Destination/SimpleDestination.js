import React from 'react';
import styles from './Destination.module.css';

const SingleDestination = props => {
    return (
        <article className={styles.Destination}>
            <figure>
                <img src={props.imageLink} alt={props.name} />
            </figure>
            <div>
                <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                    <h3 style={{ marginRight: 'auto' }}> {props.name} </h3>
                    <div className={styles.DestinationControls} >
                        <button onClick={ () => {
                            props.setAsSelected();
                            props.openModal();
                        }}>
                            <i className="fas fa-edit"></i>
                        </button>
                        <button>
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
                <p>  {props.description} </p>
            </div>
        </article>
    );
};

export default SingleDestination;