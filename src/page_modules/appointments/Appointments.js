import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
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



export default Appointments
