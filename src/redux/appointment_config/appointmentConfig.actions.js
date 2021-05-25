import { setHuecos, setHuecosOnline } from "../../services/appointments.service";

export const GET_APPOINTMENT_CONFIG = "GET_APPOINTMENT_CONFIG";
export const SET_APPOINTMENT_CONFIG = "SET_APPOINTMENT_CONFIG";
export const FINISH_APPOINMENT_CONFIG = "FINISH_APPOINMENT_CONFIG";
export const CLEAR_APPOINTMENT_INFO = "CLEAR_APPOINTMENT_INFO";
export const SET_ERROR_ON_CONFIRM = "SET_ERROR_ON_CONFIRM";
export const SET_SUCCESS_ON_CONFIRM = "SET_SUCCESS_ON_CONFIRM";

/**
 *
 */

export const getAppoinmentConfig = () => ({ type: GET_APPOINTMENT_CONFIG });
/**
 *
 */

export const setAppoinmentConfig = (property, data) => ({
	type: SET_APPOINTMENT_CONFIG,
	property,
	data,
});

/**
 * @returns Retorna una acción que indica que ha de borrarse el estado
 */

export const clearAppointment = () => ({ type: CLEAR_APPOINTMENT_INFO });

/**
 *
 * @param {Object} error
 * @returns
 */

export const setErrorInAppointment = (errorData) => ({ type: SET_ERROR_ON_CONFIRM, errorData });

/**
 *
 * @returns Setea el estado a éxito para que redirija a la vista correspondiente
 */

export const setSuccessInAppointment = () => ({ type: SET_SUCCESS_ON_CONFIRM });

/**
 * Action generator que envía una petición a la API para setear el hueco
 */

export const sendAppointmentData = (isOnline) => {
	return async (dispatch, getState) => {
		try {
			const { appointment } = getState();

			const utm_source = window.utm_source || "";
			const tmr = "";

			const query_params = {
				clinic_id: appointment.type === "VIDEO" ? "GRLCV" : appointment.city.keycli,
				clinic_name: appointment.city.clinica,
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
				type: appointment.type, 
				utm_source,
				tmr, //Se incluirá al final
				comentarios: appointment.clientData.message,
				sexo: appointment.clientData.gender,
			};

			const setHuecosResponse = isOnline
				? await setHuecosOnline(query_params)
				: await setHuecos(query_params);

			if (Number(setHuecosResponse.errores && setHuecosResponse.errores?.cod) !== 0) {
				dispatch(setErrorInAppointment(setHuecosResponse.errores));
			} else {
				dispatch(setSuccessInAppointment());
			}
		} catch (error) {}
	};
};
