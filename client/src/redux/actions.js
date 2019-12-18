import * as actions from './actionTypes';

import axios from 'axios';

export const fecthMessages = () => (async dispatch => {
    try {
        const response = await axios.get('/api/mensajes')

        dispatch({ type: actions.FETCH_MESSAGES_SUCCESS, payload: response.data })
    } catch (error) {
        dispatch({ type: actions.FETCH_MESSAGES_FAILED, payload: error.response.data })
    }
});

export const fetchAuth = () => (async dispatch => {
    const {data} = await axios.get('/api/current_user');
    
    dispatch({type: actions.FETCH_AUTH, payload: data ? true : false} ) 
})

export const login = (data) => (async dispatch => {
    try {
        await axios.post('/api/login', data);

        dispatch({ type: actions.LOGIN_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actions.LOGIN_FAILED, payload: error.response.data })
    }
});

export const logout = () => (async dispatch => {
    await axios.get('/api/logout');
    
    dispatch({ type: actions.LOGOUT_SUCCESS })
});

export const readMessage = id => (async dispatch =>{
    const response = await axios.put('/api/mensajes/marcar-leido/'+id );
    
    dispatch({type: actions.READ_MESSAGE, payload: {id, response}});
})

export const resetStatusMessage = () => ( dispatch => {
    dispatch({type: actions.RESET_STATUS_MESSAGE});
});

export const setSelectedDestination = destination => ( dispatch => {
    dispatch({type: actions.SET_SELECTED_DESTINATION, payload: destination });
})

export const resetSelectedDestination = () => ( dispatch => {
    dispatch({type: actions.RESET_SELECTED_DESTINATION });
})

export const updateSelectedDestinationGallery = gallery => (dispatch => {
    dispatch({type: actions.UPDATE_SELECTED_DESTINATION_GALLERY, payload: gallery});
})