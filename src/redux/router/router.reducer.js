
import { NAVIGATE } from './router.actions'
const initialState = {
  pre_url: null,
  url: '/'
}

/**
 * Reducer para la navegación de la aplicación
 * @param {Object} action Acción del reducer
 * @param {String} action.type Constante de la acción a realizar
 * @param {String} action.payload Estado de la navegación
 */

export default (state = initialState, action)=>{
  switch (action.type) {
    case NAVIGATE: 
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
}