import React from "react";
import Stepper from "../../../shared_modules/Stepper/Stepper";
import Calendar from "../../../shared_modules/Calendar/Calendar";
import CalendarHour from "../../../shared_modules/Calendar/CalendarHour/CalendarHour";

import "./CalendarOnlinePage.scss";
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
		
			<Calendar>
				<CalendarHour></CalendarHour>
			</Calendar>
			<Button type={'rounded-button'} label={'Rounded button'}/>
		</React.Fragment>
	);
};

export default CalendarOnlinePage;
