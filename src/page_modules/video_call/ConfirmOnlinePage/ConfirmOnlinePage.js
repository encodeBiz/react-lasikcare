import React from "react";
import Stepper from "../../../shared_modules/Stepper/Stepper";
import StepTitle from "../../../shared_modules/StepTitle/StepTitle";
import CardContainer from "../../../shared_modules/CardContainer/CardContainer";

import "./ConfirmOnlinePage.scss";
import Button from "../../../shared_modules/Button/Button";

const ConfirmOnlinePage = () => {
	return (
		<React.Fragment>
			<h1>ConfirmOnlinePage</h1>
			<Stepper></Stepper>
			<StepTitle></StepTitle>
			<CardContainer>Appointment data</CardContainer>
			<StepTitle></StepTitle>
			<CardContainer>Form</CardContainer>
            <Button type={'rounded-button'} label={'Rounded'}></Button>
		</React.Fragment>
	);
};

export default ConfirmOnlinePage;
