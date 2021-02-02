
import { Switch } from 'react-router-dom'
import {RouteWithSubRoutes} from '../../router/router.helper'
import './appointments.style.css'

function Appointments({routes}){
	return (
	<div>
		<h1>Appointments</h1>
		<Switch>
			{routes.map((route, i) => (
			  <RouteWithSubRoutes key={i} {...route} />
			))
		}
		</Switch>
	</div>
	)
	
}

export default Appointments
