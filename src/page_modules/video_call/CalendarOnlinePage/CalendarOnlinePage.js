import React from "react";
import Stepper from "../../../shared_modules/Stepper/Stepper";
import Calendar from "../../../shared_modules/Calendar/Calendar";
import CalendarHour from "../../../shared_modules/CalendarHour/CalendarHour";

import "./CalendarOnlinePage.scss";
import StepTitle from "../../../shared_modules/StepTitle/StepTitle";
import RoundedButton from "../../../shared_modules/RoundedButton/RoundedButton";
import Button from "../../../shared_modules/Button/Button";
import { useHistory } from "react-router";

const CalendarOnlinePage = () => {
	const goBack = useHistory().goBack;

	return (
		<React.Fragment>
			<h1>CalendarOnlinePage</h1>
			<Stepper></Stepper>
			<div className="top-content">
				<Button action={goBack} type={"back-button"} label={"Zurück"} />
			</div>
			<StepTitle></StepTitle>
			<Calendar>
				<CalendarHour></CalendarHour>
			</Calendar>
			<RoundedButton></RoundedButton>
		</React.Fragment>
	);
};

export default CalendarOnlinePage;
