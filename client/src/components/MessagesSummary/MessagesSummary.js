import React from 'react';

import Message from './Message/Message';
import styles from './MessagesSummary.module.css'

const messagesSummary = props => (
    <div className={styles.MessageSummary} >
        {props.data.map(message => ( <Message {...message} />))}
    </div>

);

export default messagesSummary;