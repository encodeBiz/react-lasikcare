import { getHuecos } from "../../services/appointments.service";

export const SET_HOURS = "SET_HOURS";
export const GET_HOURS = "get_hours";

export const getHoursById = (keycli, appointments_type, data) => ({ type: SET_HOURS, clinic_data: { keycli: keycli, appointments_type: appointments_type }, data, });
export const getHours = ({ keycli, appointments_type }) => ({ type: GET_HOURS, clinic_data: { appointments_type: appointments_type }, });

/**
 *
 * @param {String} keycli
 * @param {Date} date
 * @param {String} type
 *
 * Action creator para pasar el resultado de la petición al reducer.
 *
 */


export const fetchAvailableHours = (keycli, type, date) => {
	return async (dispatch) => {
        try {
            let dateToSend = ""
            if(date){
                dateToSend = date
            } else{
                dateToSend = new Date(new Date().setMonth(2)).toLocaleDateString();
            }
            
            const res = await Promise.all([getHuecos({ keycli, date: dateToSend, type })]);

            
            const data = res[0].huecos ? {[keycli] : { [type] :  res[0].huecos } } : {};

            return dispatch(getHoursById(keycli, type, data));

        } catch (error) {
            console.log(error)
        }
	};
};
