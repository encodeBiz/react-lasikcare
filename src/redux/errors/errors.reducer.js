import { SET_ERROR, GET_ERROR, DELETE_ERROR } from "./errors.actions";


/**
 * @param {Object} state Estado actual
 * @param {Object} action Acción 
 * @param {STRING} action.type 
 * @param {Object} action.error Acción 
 */

const errorReducer = async (state= {error : "Ha ocurrido un error"}, action) => {
    switch (action.type) {
        case SET_ERROR:
            return {...state, error: action.error}
        case GET_ERROR: 
            return state
        case DELETE_ERROR: 
            const filteredErrors =  state.filter((error) => error !== action.error)
            return {state: filteredErrors}    
        default:
            return state;
    }
}

export default errorReducer