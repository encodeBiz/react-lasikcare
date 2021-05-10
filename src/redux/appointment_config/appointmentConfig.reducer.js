import {
	GET_APPOINTMENT_CONFIG,
	SET_APPOINTMENT_CONFIG,
	CLEAR_APPOINTMENT_INFO,
} from "./appointmentConfig.actions";

const initialState = {
	currentStep: 0,
	type: "",
	city: "",
	calendar_date: "",
	calendar_hour: "",
	clientData: {
		ageGroup: "", // Altersgruppe
		gender: "", // Geschlecht
		name: "", //Vorname
		lastName: "", // Nachnamen
		phoneNumber: "", // Telefonnumber
		email: "", // Email adresse
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
		case CLEAR_APPOINTMENT_INFO:
			return initialState;
		default:
			return state;
	}
};

export default appoinmentConfig;
