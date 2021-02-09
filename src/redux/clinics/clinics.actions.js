import { getClinicas } from "../../services/appointments.service";

export const SET_CLINICS_APPOINTMENTS = "set_clinics";
export const GET_CLINICS_APPOINTMENTS = "get_clinics";

/**
 * Acción para lanzar el servicio de
 */
export const setClinicsAppointments = (clinics) => ({ type: SET_CLINICS_APPOINTMENTS, action: clinics, });
export const getClinicsAppointments = () => ({ type: GET_CLINICS_APPOINTMENTS });

export const setClinicAppointments = () => {
    return async (dispatch) => {
        try {
            const clinics = await getClinicas();
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

export const fetchClinicAppointments = () => {
	return (dispatch) => {
		return dispatch(getClinicsAppointments());
	};
};

