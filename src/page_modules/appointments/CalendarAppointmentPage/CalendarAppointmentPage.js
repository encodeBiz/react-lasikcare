import React from "react";
import Stepper from "../../../shared_modules/Stepper/Stepper";
import StepTitle from "../../../shared_modules/StepTitle/StepTitle";
import Calendar from "../../../shared_modules/Calendar/Calendar";
import CalendarHour from "../../../shared_modules/CalendarHour/CalendarHour";

import "./CalendarAppointmentPage.scss";
import RoundedButton from "../../../shared_modules/RoundedButton/RoundedButton";
import Button from "../../../shared_modules/Button/Button";
import { useHistory } from "react-router";

const CalendarAppointmentPage = () => {
	const goBack = useHistory().goBack


	return (
		<React.Fragment>
			<h1>Calendar Page</h1>
			<Stepper></Stepper>
			<div className="top-content">
				<Button action={goBack} type={'back-button'} label={"Zurück"}/>
			</div>
			<StepTitle></StepTitle>
			<Calendar>
				<CalendarHour></CalendarHour>
			</Calendar>
            <RoundedButton/>
		</React.Fragment>
	);
};

export default CalendarAppointmentPage;
