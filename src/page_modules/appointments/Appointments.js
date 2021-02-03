import React from "react";
import { Switch, Link } from "react-router-dom";
import { RouteWithSubRoutes } from "../../router/RouterHelper";
import "./appointments.style.css";

function Appointments({ routes }) {
	return (
		<div>
			<div>
				<Link to="/appointments/type">Type</Link>
			</div>
			<div>
				<Link to="/appointments/city">City</Link>
			</div>
			<div>
				<Link to="/appointments/calendar">CAlendar</Link>
			</div>
			<div>
				<Link to="/appointments/confirm">Confirm</Link>
			</div>
			<div>
				<Link to="/appointments/thank">Thank</Link>
			</div>
			<Switch>
				{routes.map((route, i) => (
					<RouteWithSubRoutes key={i} {...route} />
				))}
			</Switch>
		</div>
	);
}

export default Appointments;
