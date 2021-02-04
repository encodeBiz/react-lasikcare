import React from "react";
import Stepper from "../../../shared_modules/Stepper/Stepper";
import BackButton from "../../../shared_modules/BackButton/BackButton";
import Calendar from "../../../shared_modules/Calendar/Calendar";
import CalendarHour from "../../../shared_modules/Calendar/CalendarHour/CalendarHour";


import "./CalendarOnlinePage.scss";
import StepTitle from "../../../shared_modules/StepTitle/StepTitle";
import RoundedButton from "../../../shared_modules/RoundedButton/RoundedButton";

const CalendarOnlinePage = () => {
	return (
		<React.Fragment>
			<h1>CalendarOnlinePage</h1>
            <Stepper></Stepper>
            <BackButton></BackButton>
            <StepTitle></StepTitle>
            <Calendar>
                    <CalendarHour></CalendarHour>

            </Calendar>
            <RoundedButton></RoundedButton>
		</React.Fragment>
	);
};

export default CalendarOnlinePage;
