import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { RouteWithSubRoutes } from "../../router/RouterHelper";

function Video_call({ routes }) {
	return (
		<Switch>
			{routes.map((route, i) => (
				<RouteWithSubRoutes key={i} {...route} />
			))}

			<Route to="/videollamadas">
				<Redirect to="/videoberatung"></Redirect>
			</Route>
		</Switch>
	);
}

export default Video_call;
