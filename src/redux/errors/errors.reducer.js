import { SET_ERROR, GET_ERROR, DELETE_ERROR } from "./errors.actions";

const defaultState = {
    error: "Ha ocurrido un error"
}

/**
 * @param {Object} state Estado actual
 * @param {Object} action Acción 
 * @param {STRING} action.type 
 * @param {Object} action.error Acción 
 */



const errorReducer = (state= defaultState, action) => {
    switch (action.type) {
        case SET_ERROR:
            return {...state, error: action.error, notDefault: true}
        case GET_ERROR: 
            return state
        case DELETE_ERROR: 

        return defaultState    
        default:
            return state;
    }
}

export default errorReducer