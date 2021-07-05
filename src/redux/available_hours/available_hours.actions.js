import { getHuecos } from "../../services/appointments.service";
import moment from "moment";
import { setGlobalError } from "../errors/errors.actions";

export const SET_HOURS = "SET_HOURS";
export const GET_HOURS = "get_hours";
export const UPDATE_HOURS = "UPDATE_HOURS";

export const getHoursById = (keycli, appointments_type, data, month) => ({
	type: SET_HOURS,
	clinic_data: { keycli: keycli, appointments_type: appointments_type },
	month,
	data,
});

export const getHours = ({ keycli, appointments_type }) => ({
	type: GET_HOURS,
	clinic_data: { appointments_type: appointments_type },
});

export const updateHours = (keycli, appointments_type, data, nextMonth) => ({
	type: UPDATE_HOURS,
	clinic_data: { keycli: keycli, appointments_type: appointments_type },
	data,
	nextMonth,
});
/**
 *
 * @param {String} keycli
 * @param {String} date Si se pasa como argumento será como un String ("DD/MM/YYYY")
 * @param {String} type
 *
 * Action creator para pasar el resultado de la petición al reducer.
 *
 */

export const fetchAvailableHours = (keycli, type, date) => {
	console.log('fetchAvailableHours');
	return async (dispatch) => {
		try {
			let dateToSend = "";

			if (date) {
				dateToSend = date;
			} else {
				dateToSend = moment().format("DD/MM/YYYY");
			}

			const res = await Promise.all([getHuecos({ keycli, date: dateToSend, type })]);

			const month = moment(dateToSend, "DD/MM/YYYY").format("M");

			const data = res[0].huecos ? { [keycli]: { [type]: res[0].huecos } } : {};

			// return dispatch(getHoursById(keycli, type, data, month));
		} catch (error) {
			console.log(error);
		}
	};
};

export const updateAvailableHours = (keycli, type, date, nextMonth) => {
	console.log('updateAvailableHours');
	return async (dispatch) => {
		try {
			const res = await getHuecos({ keycli, date, type });
			if (Number(res?.errores?.cod) !== 0) {
				return dispatch(setGlobalError(Number(res?.errores?.cod)));
			}
			const data = res.huecos ? { [keycli]: { [type]: res.huecos } } : {};
			return dispatch(updateHours(keycli, type, data, nextMonth));
		} catch (error) {
			console.log(error);
		}
	};
};
