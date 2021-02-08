import React, { useState } from "react";
import "./Calendar.scss";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DayPickerSingleDateController } from "react-dates";
import isSameDay  from "react-dates/lib/utils/isSameDay";
import CalendarHour from "./CalendarHour/CalendarHour";
/**
 *
 * @param {Object} properties
 * @param {Object} properties.children
 * @param {[Object]} properties.appointmentDates
 * @param {Function} properties.setSelectedDate
 * @param {Function} properties.handleDateChange
 * @param {Function} properties.setFocused

 * @param {Array.<*>} properties.datesList 
 * @param {Date} properties.initialDate   
 * 
 */

const Calendar = (properties) => {
	const [selectedDate, setDate] = useState(null)
	const handleDateChange = (date) => {
		const finded = properties.datesList.filter(item =>{
			return item.formatedDate.format('DD-MM-yyyy') === date.format('DD-MM-yyyy')
		})
		setDate(finded)
	}


	return (
		<div>
			<DayPickerSingleDateController
				numberOfMonths={1}
				hideKeyboardShortcutsPanel={true}
				// daySize={calendarWidth}
				isDayHighlighted={(day1) => properties.datesList.map(item => item.formatedDate).some((day2) => isSameDay(day1, day2))}
				date={properties.initialDate} // momentPropTypes.momentObj or null
				onDateChange={handleDateChange} // PropTypes.func.isRequired
				focused={false} // PropTypes.bool
				onFocusChange={({ focused }) => properties.setFocused({ focused })} // PropTypes.func.isRequired
			>
			</DayPickerSingleDateController>
			<CalendarHour free_hours={selectedDate || []}></CalendarHour>
		</div>
		
	);
};

export default Calendar;
