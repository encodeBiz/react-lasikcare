import moment from "moment";
import { getHuecosOnline } from "../../services/appointments.service";

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

			const res = await getHuecosOnline({ date: dateToSend });
			const month = moment(dateToSend, "DD/MM/YYYY").format("M");
			const data = res.huecos ? res.huecos.hueco : {};

			return dispatch(setOnlineHours({ data, month }));
		} catch (error) {
			console.error(error);
		}
	};
};

export const updateOnlineAvailableHours = (type, date, nextMonth) => {};
