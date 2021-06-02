import moment from "moment";
import { VIDEO_KEYCLI, VIDEO_TYPE } from "../../constants/constants";
import { getHuecosOnline } from "../../services/appointments.service";
import { setGlobalError } from "../errors/errors.actions";

export const GET_ONLINE_HOURS = "GET_ONLINE_HOURS";
export const SET_ONLINE_HOURS = "SET_ONLINE_HOURS";
export const UPDATE_ONLINE_HOURS = "UPDATE_ONLINE_HOURS";

export const setOnlineHours = ({ data, month }) => ({
	type: SET_ONLINE_HOURS,
	onlineHoursData: data,
	month,
});

export const updateOnlineHours = (appointment_type, data, nextMonth) => ({
	type: UPDATE_ONLINE_HOURS,
	appointment_type,
	onlineHoursData: data,
	nextMonth,
});

export const fetchOnlineAvailableHours = (date) => {
	return async (dispatch) => {
		try {
			let dateToSend = "";
			if (date) {
				dateToSend = date;
			} else {
				dateToSend = moment().format("DD/MM/YYYY");
			}

			/// Make api call

			const res = await getHuecosOnline({
				date: dateToSend,
				keycli: VIDEO_KEYCLI,
				type: VIDEO_TYPE,
			});

			// Si el objeto errores de la respuesta no es 0 
			// gestionar el error

			if (Number(res?.errores?.cod) !== 0) {
				const error = Number(res?.errores?.cod);
				dispatch(setGlobalError(error));
				return;
			}

			// Si no hay errores continuar ejecutando y enviar respuesta

			const month = moment(dateToSend, "DD/MM/YYYY").format("M");
			const data = res.huecos ? res.huecos.hueco : {};
			return dispatch(setOnlineHours({ data, month }));
		} catch (error) {
			console.error(error);
			return dispatch(setGlobalError(error));
		}
	};
};
