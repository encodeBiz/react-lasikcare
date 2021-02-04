import React from "react";
import { Switch } from "react-router";
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
import Navbar from "../shared_modules/Navbar/Navbar";
import App from "../App";
import { connect } from "react-redux";

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
				stepNumber: 0,
			},
			{
				path: "/appointments/city",
				component: CityAppointmentPage,
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
		component: Home,
	},
];

const Root = ({ errors }) => {
	console.log(errors);
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

Root.propTypes = {
	errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	errors: state.errors,
});

export default connect(mapStateToProps)(Root);
