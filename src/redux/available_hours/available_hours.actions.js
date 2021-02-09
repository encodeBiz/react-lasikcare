import { getHuecos } from "../../services/appointments.service";

export const GET_HOURS_BY_ID = "get_hours_by_id";
export const GET_HOURS = "get_hours";

export const getHoursById = (keycli, appointments_type, data) => ({ type: GET_HOURS_BY_ID, clinic_data: { keycli: keycli, appointments_type: appointments_type }, data, });
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


export const fetchAvailableHours = (keycli, type) => {
	return async (dispatch, getState) => {

        try {
            const currentState = getState();
            const date = new Date(new Date().setMonth(2)).toLocaleDateString()

            console.log(currentState)
    
            const res = await Promise.all([currentState, getHuecos({ keycli, date, type })]);

            
            const data = res[0][keycli]?.data ? res[0][keycli]?.data : {};
    
            return dispatch(getHoursById(keycli, type, data));
            
        } catch (error) {
            console.log(error)
        }
	};
};
