import { getHuecos } from "../../services/appointments.service";
import moment from "moment";
import { videoConferenceTestData } from "../../test-data/testData";

export const SET_HOURS = "SET_HOURS";
export const SET_ONLINE_HOURS = "SET_ONLINE_HOURS";
export const GET_HOURS = "get_hours";
export const UPDATE_HOURS = "UPDATE_HOURS";

export const getHoursById = (keycli, appointments_type, data, month) => ({
	type: SET_HOURS,
	clinic_data: { keycli: keycli, appointments_type: appointments_type },
	month,
	data,
});

export const getOnlineHours = (appointment_type, onlineData, month) => ({
	type: SET_ONLINE_HOURS,
	onlineData,
	month,
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

export const fetchAvailableHours = (keycli, type, date, isOnline) => {
	return async (dispatch) => {
		try {
			let dateToSend = "";

			// Si se ha pasado una fecha se setea a esa fecha

			if (date) {
				dateToSend = date;
			} else {
				// Si no se setea al mes siguiente
				dateToSend = moment().add(1, "month").format("DD/MM/YYYY");
			}

			let res;

			if (isOnline) {
				// res = await // hacer promesa para los dtos online
				res = videoConferenceTestData;
				console.log("res", res);
			} else {
				// Se buscan en la API los huecos disponibles

				res = await Promise.all([getHuecos({ keycli, date: dateToSend, type })]);
			}

			// Se obtiene el int correspondiente al mes seleccionado

			const month = moment(dateToSend, "DD/MM/YYYY").format("M");

			// Si la Api responde con huecos libres construímos un objeto con los huecos y su tipo.
			// Si no devolvemos un objeto vacío.

			const data = res[0].huecos
				? { [isOnline ? keycli : "online"]: { [type]: res[0].huecos } }
				: {};

			// Se envían los datos para actualizar el store.

			return dispatch(getHoursById(keycli, type, data, month));
		} catch (error) {
			console.log(error);
		}
	};
};

/**
 *
 * @param {String} type
 * @param {String} date
 */

export const getOnlineAvailableHours = (type, date) => {
	try {
	} catch (error) {
		console.log(error);
	}
};

export const updateAvailableHours = (keycli, type, date, nextMonth) => {
	return async (dispatch) => {
		try {
			const res = await getHuecos({ keycli, date, type });

			const data = res.huecos ? { [keycli]: { [type]: res.huecos } } : {};

			return dispatch(updateHours(keycli, type, data, nextMonth));
		} catch (error) {
			console.log(error);
		}
	};
};
