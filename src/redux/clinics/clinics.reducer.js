import { GET_CLINICS_APPOINTMENTS, SET_CLINICS_APPOINTMENTS } from "./clinics.actions";

const initState ={status: 'pending', clinics: []}
/**
 * @param {Object} state Estado actual
 * @param {Object} action Acción 
 * @param {STRING} action.type 
 * @param {Object} action.clinics Acción 
 */
  const fn = (state = initState, action) => {
  switch (action.type) {
    case SET_CLINICS_APPOINTMENTS:
      const {clinics} = action.action
      return {...state, clinics, status: "finish"}
      case GET_CLINICS_APPOINTMENTS: 
      return state
    default:
      return state
  }
}

export default fn;