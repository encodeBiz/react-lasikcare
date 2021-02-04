import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { RouteWithSubRoutes } from "../../router/RouterHelper";
import "./appointments.style.css";

function Appointments({ routes }) {
	return (
		<Switch>
			{routes.map((route, i) => (
				<RouteWithSubRoutes key={i} {...route} />
			))}
			<Route to="/appointments">
				<Redirect to="/appointments/type"></Redirect>
			</Route>
		</Switch>
	);
}

export default Appointments;
