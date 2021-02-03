import React from "react";
import CardContainer from "../../../shared_modules/CardContainer/CardContainer";
import BackButton from "../../../shared_modules/BackButton/BackButton";
import RoundedButton from "../../../shared_modules/RoundedButton/RoundedButton";
import Stepper from "../../../shared_modules/Stepper/Stepper";



import "./CityAppointmentPage.scss";

const CityAppointmentPage = () => {
	return (
		<React.Fragment>
            <h1>City Appointment</h1>

            <Stepper/>
			<BackButton />
			<CardContainer></CardContainer>
            <RoundedButton></RoundedButton>
		</React.Fragment>
	);
};

export default CityAppointmentPage;
