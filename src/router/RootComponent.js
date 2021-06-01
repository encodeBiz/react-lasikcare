import React, { useEffect } from "react";

// Router

import { Redirect, Route, Switch } from "react-router";

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
import ThankAppointmentPage from "../page_modules/appointments/ThankAppointmentPage/ThankAppointmentPage";
import TypeAppointmentPage from "../page_modules/appointments/TypeAppointmentPage/TypeAppointmentPage";
import Video_call from "../page_modules/video_call/VideoCall";

// Estilos

import "../styles/App.scss";
import SorryPage from "../page_modules/sorryPage/SorryPage";
import ErrorToast from "../shared_modules/ErrorToast/ErrorToast";

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
		stepNumber: 0,
		routes: [
			{
				path: "/videollamadas/calendar",
				component: CalendarOnlinePage,
				stepNumber: 1,
			},
			{
				path: "/videollamadas/confirm",
				component: ConfirmOnlinePage,
				stepNumber: 2,
			},
		],
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
	const { errors } = properties;
	useEffect(() => {
		if (process.env.NODE_ENV === "production") {
			window.console.log = () => false;
		}
	}, []);

	return (
		<React.Fragment>
			{errors.notDefault && <ErrorToast />}
			{/* <Navbar></Navbar> */}
			<Switch>
				{/* Estas dos rutas deben de renderizarse aquí 
					para poder redireccionar a home cuando se 
					recarga la página
				*/}

				<Route exact path={"/"} component={CityAppointmentPage} />
				<Route exact path={"/sorry"} component={SorryPage} />

				{properties.clinics.status === "pending" ? (
					<Redirect to={"/"} />
				) : (
					<>
						{routes.map((route, i) => (
							<RouteWithSubRoutes key={i} {...route} />
						))}
					</>
				)}
			</Switch>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => ({
	errors: state.errors,
	clinics: state.clinics,
	available_hours: state.available_hours,
	state: state,
});

export default connect(mapStateToProps)(Root);
