import { getClinicas } from "../../services/appointments.service";
import { getClinicsAppointments, GET_CLINICS_APPOINTMENTS } from "./clinics.actions";

const initState ={status: 'pending', clinics: []}
/**
 * @param {Object} state Estado actual
 * @param {Object} action Acción 
 * @param {STRING} action.type 
 * @param {Object} action.clinics Acción 
 */
  const fn = async (state=initState, action)=>{
  switch (action.type) {
    case GET_CLINICS_APPOINTMENTS:
      const clinics = await getClinicas()
      return {...state, clinics: {status: 'finish', clinics: clinics}}
  
    default:
      return state
  }
}

export default fn;