import * as actions from '../actionTypes';
import { updateObject } from '../../utils/helpers';

const initialState = {
    messages: [],
    statusMessage: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.FETCH_MESSAGES_SUCCESS: return updateObject(state, { messages: action.payload });
        case actions.FETCH_MESSAGES_FAILED: return updateObject(state, { statusMessage: action.payload });
        case actions.DELETE_MESSAGE: return;
        case actions.READ_MESSAGE: return updateObject(state, { messages: updateMessageStatus(state.messages, action.payload.id) , statusMessage: action.payload.response.data });
        case actions.RESET_STATUS_MESSAGE: return updateObject(state, {statusMessage: ''} )
        default: return state;
    }
}

function updateMessageStatus(messages, id) {
    const umpdatedMessages = [...messages]
    umpdatedMessages[messages.findIndex(e => e._id === id)].readed = true;
    return umpdatedMessages;
}