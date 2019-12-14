import React from 'react';
import Button from '../../../components/UI/Button/Button';

const message = props => (
    <div className="my-3 bg-white p-3" style={{ borderRadius: '5px', border: '1px solid #777777' }}>
        <div className="d-flex align-items-center justify-content-between">
            <h5> {'Asunto: ' + props.subject} </h5>
            <Button type='Success'> Ver más </Button>
        </div>
        <div>
            <span> {'Nombre: ' + props.name} </span>
            <span> {'Correo: electrónico '} </span> <a href={props.email} > {props.email} </a>
        </div>
        <p style={{ maxHeight: '80px', overflow: 'hidden' }} >{props.message}</p>
    </div>
);

export default message;