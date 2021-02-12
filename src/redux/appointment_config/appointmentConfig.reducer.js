import { GET_APPOINTMENT_CONFIG, SET_APPOINTMENT_CONFIG } from "./appointmentConfig.actions";

const initialState = {
	currentStep: 0,
	type: "",
	city: "",
	calendar_date: "",
	calendar_hour: "",
	clientData: {
		isOlderThan50: false, // Altersgruppe
		gender: "", // Geschlecht
		name: "", //Vorname
		lastName: "", // Nachnamen
		phoneNumber: "", // Telefonnumber
		email: "", // Email adresse
		comment: false, // Nachricht
	},
};

const appoinmentConfig = (state = initialState, action) => {
	switch (action.type) {
		case GET_APPOINTMENT_CONFIG:
			return state;
		case SET_APPOINTMENT_CONFIG:
			const { property, data } = action;
			return { ...state, [property]: data };
		default:
			return state;
	}
};

export default appoinmentConfig;
