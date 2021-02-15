import React from 'react'
import "./CalendarHour.scss"

/**
 * 
 * @param {Object} properties 
 * @param {Array} properties.free_hours Huecos disponibles en la fecha seleccionada 
 */
const CalendarHour = (properties) => {
    return (
        <div className="hours-container">
           {
               properties.free_hours.map((item, index) =>{
                const a = item.horaRealCita.slice(0,2)
                const b = item.horaRealCita.slice(2,4)
                return <div className="hour-item" key={index} onClick={() => properties.selectHour(item)}>{`${a}:${b}`}</div>
               }) 
           }
        </div>
    )
}

export default CalendarHour
