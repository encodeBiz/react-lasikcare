import {
	GET_APPOINTMENT_CONFIG,
	SET_APPOINTMENT_CONFIG,
	CLEAR_APPOINTMENT_INFO,
	SET_ERROR_ON_CONFIRM,
	SET_SUCCESS_ON_CONFIRM,
} from "./appointmentConfig.actions";

const initialState = {
	error: false,
	errorData: {},
	success: false,
	currentStep: 0,
	type: "",
	city: {},
	calendar_date: "",
	calendar_hour: "",
	isOnline: false,
	clientData: {
		ageGroup: "", // Altersgruppe
		gender: "", // Geschlecht
		name: "", //Vorname
		lastName: "", // Nachname
		phoneNumber: "", // Telefonnummer
		email: "", // E-Mail Adresse
		comment: "", // Nachricht
		accepted: false,
	},
};

const appoinmentConfig = (state = initialState, action) => {
	switch (action.type) {
		case GET_APPOINTMENT_CONFIG:
			return state;
		case SET_APPOINTMENT_CONFIG:
			const { property, data } = action;
			return { ...state, [property]: data };
		case SET_ERROR_ON_CONFIRM:
			const { errorData } = action;
			return { ...state, error: true, errorData };
		case SET_SUCCESS_ON_CONFIRM:
			return { ...state, success: true };
		case CLEAR_APPOINTMENT_INFO:
			const { city, ...rest } = initialState;
			return { ...state, ...rest };
		default:
			return state;
	}
};

export default appoinmentConfig;
