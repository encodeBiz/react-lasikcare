import React from "react";
import "./CalendarHour.scss";

/**
 *
 * @param {Object} properties
 * @param {Array} properties.free_hours Huecos disponibles en la fecha seleccionada
 * @param {Number} properties.activeIndex Determina qué hora debería de estar activa
 */
const CalendarHour = (properties) => {
	return (
		<div className="hours-container">
			{properties.free_hours.map((item, index) => {
				const a = item.horaRealCita.slice(0, 2);
				const b = item.horaRealCita.slice(2, 4);

				return (
					<div
						className={`hour-item ${index === properties.activeIndex ? "select-hour" : ""}`}
						key={index}
						onClick={() => properties.selectHour(item, index)}
					>{`${a}:${b}`}</div>
				);
			})}
		</div>
	);
};

export default CalendarHour;
