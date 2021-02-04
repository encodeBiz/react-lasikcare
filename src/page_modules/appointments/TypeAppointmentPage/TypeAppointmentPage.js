import React from "react";
import "./TypeAppointmentPage.scss";
import CardContainer from "../../../shared_modules/CardContainer/CardContainer";
import StepTitle from "../../../shared_modules/StepTitle/StepTitle";
import Card from "../../../shared_modules/Card/Card";


const TypeAppointmentPage = () => {
	return (
		<React.Fragment>
			<h1>TypeAppointmentPage</h1> 
			<StepTitle/>
			
			<CardContainer>
                <Card></Card>
                <Card></Card>
            </CardContainer>
		</React.Fragment>
	);
};

export default TypeAppointmentPage;
