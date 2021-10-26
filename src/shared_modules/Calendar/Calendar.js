import React, { useState } from "react";
import "./Calendar.scss";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DayPickerSingleDateController } from "react-dates";
import isSameDay from "react-dates/lib/utils/isSameDay";
import CalendarHour from "./CalendarHour/CalendarHour";
import moment from "moment";
import Loading from "../Loading/Loading";

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
 * @param {boolean} properties.loading
 * @param {boolean} properties.disable_next
 * @param {boolean} properties.disable_prev
 */

const Calendar = (properties) => {
	const [date, setFocused] = useState(properties.initialDate);

	const onChange = (date) => {
		properties.handleDateChange(date);
		setFocused(date);
	};
	return (
		<div className={"calendar-container " + (properties.disable_next && " disable_next ") + (properties.disable_prev && " disable_prev ")} style={{position:'relative'}}>
			
			{properties.datesList !== undefined && (
				<>
				{properties.loading && (
                <div className="loading-center" style={{
									position:'absolute',
									top:'0%',
									left:0,
									background: 'white',
									zIndex: 9999
								}}>
                  <Loading />
                </div>
              )}
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
						onNextMonthClick={(e) =>{
							properties.onNextMonthClick(e)
						}}
						onPrevMonthClick={(e) => properties.onPreviousMonthClick(e)}
						
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
