import { getClinicas } from "../../services/appointments.service";

export const SET_CLINICS_APPOINTMENTS = "SET_CLINICS";
export const GET_CLINICS_APPOINTMENTS = "GET_CLINICS";

/**
 * Acción para lanzar el servicio de
 */
export const setClinicsAppointments = (clinics) => ({
	type: SET_CLINICS_APPOINTMENTS,
	action: clinics,
});

export const fetchClinics = () => {
	return async (dispatch) => {
		try {
			const clinics = await getClinicas();

			// Si hay error en la petición gestionar el error

			const clinicsData = {
				status: "finish",
				clinics,
			};
			return dispatch(setClinicsAppointments(clinicsData));
		} catch (error) {
			console.log(error);
		}
	};
};
