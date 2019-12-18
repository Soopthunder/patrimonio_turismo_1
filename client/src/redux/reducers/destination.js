import {
    SET_SELECTED_DESTINATION,
    RESET_SELECTED_DESTINATION,
    UPDATE_SELECTED_DESTINATION_GALLERY
} from '../actionTypes';
import { updateObject } from '../../utils/helpers'


export default (state = { selected: null }, action) => {
    switch (action.type) {
        case SET_SELECTED_DESTINATION: return updateObject(state, { selected: action.payload });
        case RESET_SELECTED_DESTINATION: return updateObject(state, { selected: null });
        case UPDATE_SELECTED_DESTINATION_GALLERY: return updateObject(state, {selected: updateObject(state.selected, { gallery: action.payload })})
        default: return state;
    }
}