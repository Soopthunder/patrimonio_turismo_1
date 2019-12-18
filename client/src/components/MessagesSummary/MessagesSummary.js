import React from 'react';

import Message from './Message/Message';
import styles from './MessagesSummary.module.css'

const messagesSummary = ({data, markAsReaded}) => (
    <div className={styles.MessageSummary} >
        {data.map(message => ( <Message key={message._id} {...message} markAsReaded={markAsReaded} summary />))}
    </div>
);

export default messagesSummary;