import React from "react";
import "./Button.scss";

/**
 *
 * @param {Object} properties Propiedades del componente
 * @param {Function} properties.action Acción que devuelve el evento click
 * @param {String} properties.label Label del botón
 * @param {String} properties.styleType Tipo del botón para llamar a su correcto style
 * @param {Boolean} properties.disabled Si es true se desabilita el botón si es false o falsy se activa
 * @param {String} properties.icon Una dirección de la imagen que se utilizará de icono en el botón
 */
const Button = (properties) => {
	const { icon } = properties;
	return (
		<button
			onClick={() => properties.action()}
			className={`main-btn ${properties.styleType}`}
			disabled={properties.disabled}
		>
			{icon ? (
				<span>
					<img src={icon} alt="..." />
				</span>
			) : null}
			{properties.label}
		</button>
	);
};

export default Button;
