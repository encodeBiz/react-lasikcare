import React from "react";

// Router

import { Switch } from "react-router";

// Redux

import { connect } from "react-redux";
// Helper

import { RouteWithSubRoutes } from "./RouterHelper";

// Componentes 

import Appointments from "../page_modules/appointments/Appointments";
import AppointmentType from "../page_modules/appointmentType/AppointmentType";
import CalendarAppointmentPage from "../page_modules/appointments/CalendarAppointmentPage/CalendarAppointmentPage";
import CalendarOnlinePage from "../page_modules/video_call/CalendarOnlinePage/CalendarOnlinePage";
import CityAppointmentPage from "../page_modules/appointments/CityAppointmentPage/CityAppointmentPage";
import ConfirmAppointmentPage from "../page_modules/appointments/ConfirmAppointmentPage/ConfirmAppointmentPage";
import ConfirmOnlinePage from "../page_modules/video_call/ConfirmOnlinePage/ConfirmOnlinePage";
import Navbar from "../shared_modules/Navbar/Navbar";
import ThankAppointmentPage from "../page_modules/appointments/ThankAppointmentPage/ThankAppointmentPage";
import ThankOnlinePage from "../page_modules/video_call/ThankOnlinePage/ThankOnlinePage";
import TypeAppointmentPage from "../page_modules/appointments/TypeAppointmentPage/TypeAppointmentPage";
import Video_call from "../page_modules/video_call/VideoCall";

// Estilos

import "../styles/App.scss"

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
		path: "/appointments",
		component: Appointments,
		stepNumber: 0, 
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
