import React from "react";
import BackButton from "../../../shared_modules/BackButton/BackButton";
import Stepper from "../../../shared_modules/Stepper/Stepper";
import StepTitle from "../../../shared_modules/StepTitle/StepTitle";
import Calendar from "../../../shared_modules/Calendar/Calendar";
import CalendarHour from "../../../shared_modules/Calendar/CalendarHour/CalendarHour";

import "./CalendarAppointmentPage.scss";
import RoundedButton from "../../../shared_modules/RoundedButton/RoundedButton";

const CalendarAppointmentPage = () => {
	return (
		<React.Fragment>
			<h1>Calendar Page</h1>
			<Stepper></Stepper>
			<BackButton></BackButton>
			<StepTitle></StepTitle>
			<Calendar>
				<CalendarHour></CalendarHour>
			</Calendar>
            <RoundedButton/>
		</React.Fragment>
	);
};

export default CalendarAppointmentPage;
