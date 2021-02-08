import React from 'react'
import "./CalendarHour.scss"

/**
 * 
 * @param {Object} properties 
 * @param {Array} properties.free_hours Huecos disponibles en la fecha seleccionada 
 */
const CalendarHour = (properties) => {
    console.log(properties.free_hours)
    return (
        <div>
           {
               properties.free_hours.map((item, index) =>{
                const a = item.horaRealCita.slice(0,2)
                const b = item.horaRealCita.slice(2,4)
                return <p key={index}>{`${a}:${b}`}</p>
               }) 
           }
        </div>
    )
}

export default CalendarHour
