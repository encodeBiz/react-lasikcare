import { SET_HOURS } from "./available_hours.actions";

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
const fn = (state = initialState, action) => {
	switch (action.type) {
		case SET_HOURS:
			const { keycli, appointments_type } = action.clinic_data;

			return {
				...state,
				[keycli]: {
					status: "finish",
					data: {
						...state[keycli]?.data,
						[appointments_type]: action.data[keycli][appointments_type].hueco,
					},
				},
			};

		default:
			return state;
	}
};

export default fn;
