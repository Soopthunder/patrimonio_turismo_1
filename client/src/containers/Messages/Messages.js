import React from 'react';

import { connect } from 'react-redux';

import Message from '../../components/MessagesSummary/Message/Message';
import MessagesSummary from '../../components/MessagesSummary/MessagesSummary';
import Toast from '../../components/UI/Toast/toast';
import {resetStatusMessage , readMessage} from '../../redux/actions';

const messages = ({ messages, message, match, resetToast, readMessage }) => {
    return (
        <div className="row">
            <div className="col-4" style={{maxHeight: '500px'}} >
                <MessagesSummary markAsReaded={readMessage} small data={messages} />
            </div>
            <div className="col-8">
                <Message
                    { ...messages.find(message => message._id === match.params.id)} 
                    readMessage={readMessage}
                />
            </div>
            <Toast message={message} setMessage={resetToast} />
        </div>
    )
}

const mapStateToProps = state => ({
    messages: state.messages.messages.reverse(),
    message: state.messages.message
});

const mapDispatchToProps = dispatch => ({
    resetToast: () => dispatch( resetStatusMessage()),
    readMessage: id => dispatch( readMessage(id) )
})

export default connect(mapStateToProps, mapDispatchToProps)(messages);