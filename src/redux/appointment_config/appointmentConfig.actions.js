import { setHuecos } from "../../services/appointments.service";


export const GET_APPOINTMENT_CONFIG = "GET_APPOINTMENT_CONFIG";
export const SET_APPOINTMENT_CONFIG = "SET_APPOINTMENT_CONFIG";
export const FINISH_APPOINMENT_CONFIG = "FINISH_APPOINMENT_CONFIG";

export const getAppoinmentConfig = () => ({ type: GET_APPOINTMENT_CONFIG });
export const setAppoinmentConfig = (property, data) => ({
	type: SET_APPOINTMENT_CONFIG,
	property,
	data,
});
export const finishAppointmentConfig = () => ({ type: FINISH_APPOINMENT_CONFIG });

export const sendAppointmentData = () => {
	return async (dispatch, getState) => {
		try {
			const { appointment } = getState();

			const utm_source = window.utm_source || "";
			const tmr = ""

			console.log(appointment.calendar_hour);
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

			console.log(query_params);
			const setHuecosResponse = await setHuecos(query_params);
		
			console.log(setHuecosResponse);
		} catch (error) {}
	};
};
