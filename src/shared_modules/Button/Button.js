import React from 'react'
import "./Button.scss";

/**
 * 
 * @param {Object} properties Propiedades del componente
 * @param {Function} properties.action Acción que devuelve el evento click
 * @param {Function} properties.label Label del botón 
 * @param {Function} properties.type Tipo del botón para llamar a su correcto style
 */
const Button = (properties) => {
    return (
        <div className={`button`}>
            <button onClick={() => properties.action()} className={`${properties.type}`}>
                {properties.label}
            </button>
        </div>
    )
}

export default Button
