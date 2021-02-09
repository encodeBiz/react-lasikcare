import React from "react";
import "./ThankOnlinePage.scss";
import CardContainer from "../../../shared_modules/CardContainer/CardContainer";

const ThankOnlinePage = () => {
	return (
		<React.Fragment>
			<h1>ThanksOnline</h1>

			<CardContainer>Danke</CardContainer>
			<CardContainer>Appointment data</CardContainer>
		
			<CardContainer>Information</CardContainer>
		</React.Fragment>
	);
};

export default ThankOnlinePage;
