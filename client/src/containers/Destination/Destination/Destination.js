import React from 'react';

import axios from 'axios';

import styles from './Destination.module.css';

const SingleDestination = props => {
    return (
        <article className={styles.Destination}>
            <figure>
                <img src={props.imageUrl} alt={props.title} />
            </figure>
            <div className={styles.Details} >
                <div className="d-flex justify-content-center align-items-center mb-2">
                    <h4 className="mr-auto">
                        {props.title}
                        {props.popular ?
                            <span style={{ marginLeft: '10px', color: 'violet' }}>
                                <i className="fas fa-fire"></i>
                            </span> : null}
                        {props.type === 'Grupal' ?
                            <span style={{ marginLeft: '10px', color: 'blue' }}>
                                <i className="fas fa-users"></i>
                            </span> :
                            <span style={{ marginLeft: '10px', color: 'blue' }}>
                                <i className="fas fa-user-alt"></i>
                            </span>
                        }
                    </h4>
                    <div className={styles.DestinationControls} >
                        <button onClick={() => props.editDestination()}>
                            <i className="fas fa-edit"></i>
                        </button>
                        <button onClick={async () => {
                            try {
                                const res = await axios.post('api/eliminar-destino/' + props._id);
                                props.deleteDestination();
                                props.setToastMessage(res.data.message);
                            } catch (error) {
                                props.setToastMessage(error.message)
                            }
                        }}>
                            <i className="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
                {props.type === 'Grupal' ?
                    <ul class={styles.PackageList}>
                        <li class="d-flex justify-content-between align-items-center">
                            <span>Duracion</span>
                            <span> {props.duration} </span>
                        </li>
                        <li class="d-flex justify-content-between align-items-center">
                            <span>Dia de salida</span>
                            <span> {new Date(props.departureDate).toLocaleDateString()} </span>
                        </li>
                        <li class="d-flex justify-content-between align-items-center">
                            <span>Aeropuerto</span>
                            <span> {props.airport} </span>
                        </li>
                        <li class="d-flex justify-content-between align-items-center">
                            <span>Regimen de comidas</span>
                            <span> {props.food} </span>
                        </li>
                        <li class="d-flex justify-content-between align-items-center">
                            <span>Precio por persona</span>
                            <span> {props.price} </span>
                        </li>
                        <li class="d-flex justify-content-between align-items-center">
                            <span>intinerarios</span>
                            <a
                                className={styles.Btn}
                                target="_blank"
                                rel="noopener noreferrer"
                                href={props.pdfUrl}>
                                Ver
                            </a>
                        </li>
                    </ul> :
                    <ul class={styles.PackageList}>
                        <li class="d-flex justify-content-between align-items-center">
                            <span>País</span>
                            <span> {props.country} </span>
                        </li>
                        <li class="d-flex justify-content-between align-items-center">
                            <span>Región</span>
                            <span> {props.region || "Sin región"} </span>
                        </li>
                        <li class="d-flex justify-content-between align-items-center">
                            <span>Continente</span>
                            <span> {props.continent} </span>
                        </li>
                        <li class="d-flex justify-content-between align-items-center">
                            <span>Información adicional</span>
                            {props.pdf ? <a
                                className={styles.Btn}
                                target="_blank"
                                rel="noopener noreferrer"
                                href={props.pdfUrl}>
                                Ver
                                </a> :
                                <span>Sin archivo</span>
                            }
                        </li>
                    </ul>
                }
            </div>
        </article >
    );
};

export default SingleDestination;