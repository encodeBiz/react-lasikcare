import { setHuecos } from "../../services/appointments.service";


export const GET_APPOINTMENT_CONFIG = "GET_APPOINTMENT_CONFIG";
export const SET_APPOINTMENT_CONFIG = "SET_APPOINTMENT_CONFIG";
export const FINISH_APPOINMENT_CONFIG = "FINISH_APPOINMENT_CONFIG";
export const CLEAR_APPOINTMENT_INFO = "CLEAR_APPOINTMENT_INFO"

/**
 * 
 */

export const getAppoinmentConfig = () => ({ type: GET_APPOINTMENT_CONFIG });
/**
 * 
 */

export const setAppoinmentConfig = (property, data) => ({ type: SET_APPOINTMENT_CONFIG, property, data, });


/**
 * @returns Retorna una acción que indica que ha de borrarse el estado
 */

export const clearAppointment = () => ({ type: CLEAR_APPOINTMENT_INFO });


/**
 * Action generator que envía una petición a la API para setear el hueco
 */

export const sendAppointmentData = () => {
	return async (dispatch, getState) => {
		try {
			const { appointment } = getState();

			const utm_source = window.utm_source || "";
			const tmr = ""

			const query_params = {
				clinic_id: appointment.city.keycli,
				clinic_name: appointment.city.name,
				clinic_address: appointment.city.address,
				date: appointment.calendar_hour.fecha,
				hour: appointment.calendar_hour.horaInicio,
				horaFin: appointment.calendar_hour.horaFin,
				keymed: appointment.calendar_hour.keymed,
				gender: appointment.clientData.gender,
				first_name: appointment.clientData.name,
				last_name: appointment.clientData.surname,
				email: appointment.clientData.email,
				phone: appointment.clientData.phoneNumber,
				message: appointment.clientData.message,
				utm_source,
				tmr, //Se incluirá al final
				comentarios: appointment.clientData.message,
				sexo: appointment.clientData.gender,
			};

			const setHuecosResponse = await setHuecos(query_params);
		
		} catch (error) {}
	};
};


