import React, { useState, useEffect } from "react";
import "./Calendar.scss";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DayPickerSingleDateController } from "react-dates";
import isSameDay  from "react-dates/lib/utils/isSameDay";
import CalendarHour from "./CalendarHour/CalendarHour";
import useWindowSize from "../../hooks/useWindowSize";
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
	const [calendarWidth, setCalendarWidth] = useState(null);
	const { width } = useWindowSize();

	const handleDateChange = (date) => {
		const finded = properties.datesList.filter(item =>{
			return item.formatedDate.format('DD-MM-yyyy') === date.format('DD-MM-yyyy')
		})
		setDate(finded)
	}

	const formatCalendarWidth = (width) => {
		//a partir de 1080 no debe ejecutarse la función
		if (width <= 320) return 32;
		else if (width <= 414 || width <= 1080) return 40;
		else if (width <= 980) return 50;
		else return 50;
	  };
	
	  useEffect(() => {
		setCalendarWidth(formatCalendarWidth(width));
	  }, [width]);


	return (
		<div className="calendar-container">
			<DayPickerSingleDateController
				numberOfMonths={1}
				hideKeyboardShortcutsPanel={true}
				daySize={calendarWidth}
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
