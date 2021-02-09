import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { getHoursById } from "../../redux/available_hours/available_hours.actions";
import { getClinicsAppointments } from "../../redux/clinics/clinics.actions";
import { RouteWithSubRoutes } from "../../router/RouterHelper";
import "./appointments.style.css";

/**
 * Root de las citas y punto de entrada
 * @param {Object} properties Properties para la página
 * @param {Promise} properties.available_hours Huecos de las clinicas
 * @param {Promise} properties.clinics Huecos de las clinicas
 * @param {Function} properties.getClinicsAppointments Acción para obtener las clínicas
 * @param {Function} properties.getHoursById  Acción para obtener los huecos dado una clinica y un tipo de cita
 * @param {[String]} properties.routes Subrutas de citas
 */

function Appointments(properties) {
	const [init, setInit] = useState(false);
	const [clinics, setClinics] = useState([]);

	useEffect(() => {
    properties.getClinicsAppointments();
    getClinics(); 
    getHours(); 
	}, []);


	const getHours = () => {
		properties.clinics.then((clinicsState) => {
			if (clinicsState.clinics.status === "finish" && !init) {
				setInit(true);
				const cli = clinicsState.clinics.clinics;
				for (let index = 0; index < cli.length; index++) {
					const { keycli } = cli[index];
					properties.getHoursById(keycli, "BI");
					properties.getHoursById(keycli, "BIDI");
				}
			}
		});
	};

	const getClinics = () => {
		properties.clinics.then((clinicsState) => {
			if (clinicsState.clinics.status === "finish") {
				setClinics(clinicsState.clinics.clinics);
			}
		});
	};

	return (
		<Switch>
			{properties.routes.map((route, i) => (
				<RouteWithSubRoutes key={i} {...route} />
			))}
			<Route to="/appointments">
				<Redirect to="/appointments/type"></Redirect>
			</Route>
		</Switch>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		getClinicsAppointments: () => dispatch(getClinicsAppointments()),
		getHoursById: (keycli, appointments_type) => dispatch(getHoursById(keycli, appointments_type)),
	};
};
const mapStateToProps = (state, routes) => ({
	clinics: state.clinics,
	available_hours: state.available_hours,
});

export default connect(mapStateToProps, mapDispatchToProps)(Appointments);
