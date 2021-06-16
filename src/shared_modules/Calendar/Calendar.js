import React, { useState } from "react";
import "./Calendar.scss";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DayPickerSingleDateController } from "react-dates";
import isSameDay from "react-dates/lib/utils/isSameDay";
import CalendarHour from "./CalendarHour/CalendarHour";
import moment from "moment";

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
 * @param {String} properties.initialMonthString
 * @param {Number} properties.initialMonth
 *
 */

const Calendar = (properties) => {
	const [date, setFocused] = useState(properties.initialDate);

	const onChange = (date) => {
		properties.handleDateChange(date);
		setFocused(date);
	};

	console.log(properties);
	return (
		<div className="calendar-container">
			{properties.datesList !== undefined && (
				<>
					<DayPickerSingleDateController
						initialVisibleMonth={() => moment().add(properties.initialMonth, "months")}
						numberOfMonths={1}
						hideKeyboardShortcutsPanel={true}
						daySize={properties.calendarWidth}
						focused={true}
						// Si hay datos de fechas se pintan los días seleccionados
						// Si no se pone un condicional para comprobar que properties.datesList no llega undefined
						// Calendar rompe la aplicación

						isDayHighlighted={(day1) =>
							properties.datesList?.length > 0 &&
							properties.datesList
								.map((item) => item.formattedDate)
								.some((day2) => isSameDay(day1, day2))
						}
						date={date} // momentPropTypes.momentObj or null
						onDateChange={onChange} // PropTypes.func.isRequired
						// focused={false} // PropTypes.bool
						// onFocusChange={(item) => console.log(item)} // PropTypes.func.isRequired
						onNextMonthClick={(e) => properties.onNextMonthClick(e)}
						onPrevMonthClick={(e) => properties.onPreviousMonthClick(e)}
						// isOutsideRange={(day1) =>
						// 	properties.datesList?.length > 0 &&
						// 	properties.datesList
						// 		.map((item) => item.formattedDate)
						// 		.some((day2) => {
						// 			// console.log(day1);
						// 			// console.log(day2);
						// 			return !isSameDay(day1, day2);
						// 		})
						// }
					></DayPickerSingleDateController>
					{properties.selectedDate && (
						<CalendarHour
							activeIndex={properties.activeIndex}
							free_hours={properties.selectedDate || []}
							selectHour={properties.handleSelectedHour}
						></CalendarHour>
					)}
				</>
			)}
		</div>
	);
};

export default Calendar;
