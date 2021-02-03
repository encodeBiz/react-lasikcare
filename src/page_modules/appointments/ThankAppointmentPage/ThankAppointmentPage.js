import React from "react";
import CardContainer from "../../../shared_modules/CardContainer/CardContainer";
import StepTitle from "../../../shared_modules/StepTitle/StepTitle";
import "./ThankAppointmentPage.scss";

const ThankAppointmentPage = () => {
	return (
		<React.Fragment>

            <h1>Thanks</h1>

			<CardContainer>Danke</CardContainer>
			<CardContainer>Appointment data</CardContainer>
			<StepTitle></StepTitle>
			<CardContainer>Information</CardContainer>
		</React.Fragment>
	);
};

export default ThankAppointmentPage;
