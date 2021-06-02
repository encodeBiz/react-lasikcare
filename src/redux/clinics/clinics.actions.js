import { getClinicas } from "../../services/appointments.service";
import { setGlobalError } from "../errors/errors.actions";

export const SET_CLINICS_APPOINTMENTS = "SET_CLINICS";
export const GET_CLINICS_APPOINTMENTS = "GET_CLINICS";

/**
 * Acción para lanzar el servicio de
 */
export const setClinicsAppointments = (clinics) => ({ type: SET_CLINICS_APPOINTMENTS, action: clinics, });

export const fetchClinics = () => {
    return async (dispatch) => {
        try {
            const clinics = await getClinicas();

			// Si hay error en la petición gestionar el error

			if(Number(clinics?.errores?.cod) !== 0){
				dispatch(setGlobalError(Number(clinics?.errores?.cod))); 
				return; 
			}

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


