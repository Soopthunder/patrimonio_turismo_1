import * as actions from '../actionTypes';
import { updateObject } from '../../utils/helpers'

const initialState = {
    isAuth: false,
    error: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.FETCH_AUTH: return updateObject(state, {isAuth: action.payload});
        case actions.LOGIN_SUCCESS: return updateObject(state, { isAuth: true });
        case actions.LOGIN_FAILED: return updateObject(state, { error: action.payload });
        case actions.LOGOUT_SUCCESS: return updateObject(state, { isAuth: false });
        default: return state;
    }
}