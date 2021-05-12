import { SET_HOURS, UPDATE_HOURS, SET_ONLINE_HOURS } from "./available_hours.actions";

const initialState = {};

/**
 *
 * @param {Object} state
 * @param {Object} action
 * @param {String} action.type
 * @param {Object} action.clinic_data
 * @param {String} action.clinic_data.keycli
 * @param {String} action.clinic_data.appointments_type
 */
const fn = (state = { initialState }, action) => {
	switch (action.type) {
		case SET_HOURS:
			const { keycli, appointments_type } = action.clinic_data;
			const data = action.data[keycli][appointments_type].hueco;
			return {
				...state,
				[keycli]: {
					status: "finish",
					data: {
						...state[keycli]?.data,
						[appointments_type]: { [action.month]: data },
					},
				},
			};

		case SET_ONLINE_HOURS:
			const { onlineData, month } = action;

			return {
				...state,
				online_hours: {
					status: "finish",
					[month]: onlineData,
				},
			};
		case UPDATE_HOURS:
			const currentData =
				state[action.clinic_data.keycli].data[action.clinic_data.appointments_type];
			const newData =
				action.data[action.clinic_data.keycli][action.clinic_data.appointments_type].hueco;

			return {
				...state,
				[action.clinic_data.keycli]: {
					status: "finish",
					data: {
						...state[action.clinic_data.keycli]?.data,
						[action.clinic_data.appointments_type]:
							newData && newData.length > 0
								? { ...currentData, [action.nextMonth]: [...newData] }
								: currentData,
					},
				},
			};
		default:
			return state;
	}
};

export default fn;
