import React from "react";
import "./Calendar.scss";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DayPickerSingleDateController } from "react-dates";

/**
 *
 * @param {Object} properties
 * @param {Object} properties.children
 * @param {[Object]} properties.appointmentDates
 * @param {Function} properties.setSelectedDate
 * @param {Function} properties.handleDateChange
 * @param {Function} properties.setFocused
 * @param {Function} properties.isSameDay
 * @param {Array} properties.datesList
 * @param {Date} properties.initialDate   
 *    
 *    
 *    
 * 
 */

const Calendar = (properties) => {
	return (
		<DayPickerSingleDateController
			numberOfMonths={1}
			hideKeyboardShortcutsPanel={true}
			// daySize={calendarWidth}
			// isDayHighlighted={(day1) => properties.datesList.some((day2) => properties.isSameDay(day1, day2))}
			date={properties.initialDate} // momentPropTypes.momentObj or null
			onDateChange={properties.handleDateChange} // PropTypes.func.isRequired
			focused={false} // PropTypes.bool
			onFocusChange={({ focused }) => properties.setFocused({ focused })} // PropTypes.func.isRequired
		>
		</DayPickerSingleDateController>
	);
};

export default Calendar;
