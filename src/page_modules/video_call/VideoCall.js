import React from "react";
import { Link, Switch } from "react-router-dom";
import { RouteWithSubRoutes } from "../../router/RouterHelper";

function Video_call({routes}) {
	return (
		
		<React.Fragment>
				<div><Link to="/videollamadas/calendar">/videollamadas/calendar</Link></div>
				<div><Link to="/videollamadas/confirm">/videollamadas/confirm</Link></div>
				<div><Link to="/videollamadas/thank">/videollamadas/thank</Link></div>
				
				<Switch>
					{routes.map((route, i) => (
						<RouteWithSubRoutes  key={i} {...route}/>
					))}
				</Switch>

		</React.Fragment>


	

	);
}

export default Video_call;
