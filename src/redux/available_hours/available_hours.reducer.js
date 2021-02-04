import { getHuecos } from "../../services/appointments.service";
import { GET_HOURS_BY_ID, GET_HOURS } from "./available_hours.actions";

const initialState = {}

/**
 * 
 * @param {Object} state 
 * @param {Object} action 
 * @param {String} action.type
 * @param {Object} action.clinic_data  
 * @param {String} action.clinic_data.keycli 
 * @param {String} action.clinic_data.appointments_type 
 */
const fn = async (state = initialState, action)=>{
  switch (action.type) {
    case GET_HOURS_BY_ID:
      const params = {
        keycli: action.clinic_data.keycli,
        date: new Date(new Date().setMonth(2)).toLocaleDateString(),
        type: action.clinic_data.appointments_type
      };

      const res = await Promise.all([state, getHuecos(params)])  
   
      
      const data = res[0][action.clinic_data.keycli]?.data ? res[0][action.clinic_data.keycli]?.data : {}
      
      return {...res[0], [action.clinic_data.keycli]: { 
          status: 'finish', 
          data:{
            ...data,
            [action.clinic_data.appointments_type]: res[1].huecos
          }  
        }
      }
      
  
    default:
      return state;
  }
}

export default fn;