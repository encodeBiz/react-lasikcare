import React from "react";
import CardContainer from "../../../shared_modules/CardContainer/CardContainer";
import RoundedButton from "../../../shared_modules/RoundedButton/RoundedButton";
import Stepper from "../../../shared_modules/Stepper/Stepper";

import "./CityAppointmentPage.scss";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import Button from "../../../shared_modules/Button/Button";

const CityAppointmentPage = (properties) => {
	const goBack = useHistory().goBack;

	return (
		<React.Fragment>
			<h1>City Appointment</h1>

			<Stepper />
			<div className="top-content">
				<Button action={goBack} type={"back-button"} label={"Züruch"} />
			</div>
			<CardContainer></CardContainer>
			<RoundedButton></RoundedButton>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => {
	return {
		appointment: state.appointment,
	};
};

export default connect(mapStateToProps)(CityAppointmentPage);
