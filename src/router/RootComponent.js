import React from "react";
import { Switch } from "react-router-dom";
import PropTypes from "prop-types";

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
import Home from "../page_modules/home/Home";

const routes = [
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
			},
			{
				path: "/appointments/city",
				component: CityAppointmentPage,
			},
			{
				path: "/appointments/calendar",
				component: CalendarAppointmentPage,
			},
			{
				path: "/appointments/confirm",
				component: ConfirmAppointmentPage,
			},
			{
				path: "/appointments/thank",
				component: ThankAppointmentPage,
			},
		],
	},
	{
		path: "/",
		component: Home,
	},
];

const Root = ({ store }) => {
	return (
		// <Router history={history}>
		<Switch>
			{routes.map((route, i) => (
				<RouteWithSubRoutes key={i} {...route} />
			))}
		</Switch>
		// </Router>
	);
};

Root.propTypes = {
	store: PropTypes.object.isRequired,
};

export default Root;
