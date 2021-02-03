import React from "react";
import { Switch, Link, Route, Redirect } from "react-router-dom";
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
				<Link to="/appointments/calendar">Calendar</Link>
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
				<Route to="/appointments">
						<Redirect to="/appointments/type"></Redirect>
				</Route>
			</Switch>
		</div>
	);
}

export default Appointments;
