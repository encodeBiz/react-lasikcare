import React from 'react'
import "./Button.scss";

/**
 * 
 * @param {Object} properties Propiedades del componente
 * @param {Function} properties.action Acción que devuelve el evento click
 * @param {String} properties.label Label del botón 
 * @param {String} properties.styleType Tipo del botón para llamar a su correcto style
 * @param {Boolean} properties.disabled Si es true se desabilita el botón si es false o falsy se activa
 */
const Button = (properties) => {
	return (
		<button onClick={() => properties.action()} className={`main-btn ${properties.styleType}`} disabled={properties.disabled}>
			{properties.label}
		</button>
	)
}

export default Button
