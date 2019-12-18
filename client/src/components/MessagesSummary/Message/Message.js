import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';

import classes from './Message.module.css'

const Message = ({ readed, _id, name, creationDate, subject, email, message, markAsReaded, readMessage, summary }) => {

    useEffect(() => {
        if (!readed && readMessage ) readMessage(_id);
    }, [_id, readMessage, readed])

    const c = readed ? classes.Message : classes.Message + ' ' + classes.NotReaded
    const icon = readed ?
        <i className="fas fa-envelope-open"></i>:
        <button type="button" onClick={() => markAsReaded(_id)}>
            <i className="fas fa-envelope"></i>
        </button>
    return (
        <div style={{ fontSize: summary ? '14px' : '18px' }} className={"mb-4 p-3 " + c}>
            <div className="d-flex align-items-center justify-content-between">
                <h5 className="mr-auto"> {subject} </h5>
                {!summary ? icon : null}
            </div>
            <div>
                <span style={{ display: 'block' }}> {'Nombre: ' + name} </span>
                <span style={{ display: 'block' }}> {'Fecha de envio: ' + new Date(creationDate).toLocaleDateString()} </span>
                <span style={{ display: 'inline-block' }}> {'Correo:'} </span> <a href={email} > {email} </a>
            </div>
            {summary ? null : <p style={{ maxHeight: '80px', overflow: 'hidden' }} >{message}</p>}
            {summary ?
                <div>
                    <Link to={"/mensajes/" + _id}> Ver más </Link>
                    {icon}
                </div> : null}
        </div>
    )
};

export default Message;