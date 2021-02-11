import React from "react";
import { Switch } from "react-router";
import Appointments from "../page_modules/appointments/Appointments";
import Video_call from "../page_modules/video_call/VideoCall";
import { RouteWithSubRoutes } from "./RouterHelper";
import TypeAppointmentPage from "../page_modules/appointments/TypeAppointmentPage/TypeAppointmentPage";
import CityAppointmentPage from "../page_modules/appointments/CityAppointmentPage/CityAppointmentPage";
import CalendarAppointmentPage from "../page_modules/appointments/CalendarAppointmentPage/CalendarAppointmentPage";
import ConfirmAppointmentPage from "../page_modules/appointments/ConfirmAppointmentPage/ConfirmAppointmentPage";
import ThankAppointmentPage from "../page_modules/appointments/ThankAppointmentPage/ThankAppointmentPage";
import CalendarOnlinePage from "../page_modules/video_call/CalendarOnlinePage/CalendarOnlinePage";
import ConfirmOnlinePage from "../page_modules/video_call/ConfirmOnlinePage/ConfirmOnlinePage";
import ThankOnlinePage from "../page_modules/video_call/ThankOnlinePage/ThankOnlinePage";
import App from "../App";
import Navbar from "../shared_modules/Navbar/Navbar";
import { connect } from "react-redux";
import AppointmentType from "../page_modules/appointmentType/AppointmentType";

const routes = [
	{
		path: "/city",
		component: CityAppointmentPage,
	},
	{
		path: "/type",
		component: AppointmentType,
	},
	{
		path: "/videollamadas",
		component: Video_call,
		routes: [
			{
				path: "/videollamadas/calendar",
				component: CalendarOnlinePage,
			},
			{
				path: "/videollamadas/confirm",
				component: ConfirmOnlinePage,
			},
			{
				path: "/videollamadas/thank",
				component: ThankOnlinePage,
			},
		],
	},
	{
		path: "/appointments",
		component: Appointments,
		routes: [
			{
				path: "/appointments/type",
				component: TypeAppointmentPage,
				stepNumber: 1,
			},
			{
				path: "/appointments/calendar",
				component: CalendarAppointmentPage,
				stepNumber: 2,
			},
			{
				path: "/appointments/confirm",
				component: ConfirmAppointmentPage,
				stepNumber: 3,
			},
			{
				path: "/appointments/thank",
				component: ThankAppointmentPage,
				stepNumber: 4,
			},
		],
	},
	{
		path: "/",
		component: CityAppointmentPage,
	},
];

/**
 *
 * Enrutador principal de la plataforma
 * @param {Object} properties
 * @param {Object} properties.errors Estado del controlador de errores
 * @param {String} properties.errors.type Tipo de error
 * @param {String} properties.errors.message Mensaje del error
 */
const Root = (properties) => {
	return (
		<React.Fragment>
			<Navbar></Navbar>
			<Switch>
				{routes.map((route, i) => (
					<RouteWithSubRoutes key={i} {...route} />
				))}
			</Switch>
		</React.Fragment>
	);
};



const mapStateToProps = (state) => ({
	errors: state.errors,
});

export default connect(mapStateToProps)(Root);
