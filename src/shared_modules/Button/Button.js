import React from "react";
import { IMAGES_SERVER } from "../../constants/constants";
import "./Button.scss";




/**
 *
 * @param {Object} properties Propiedades del componente
 * @param {Function} properties.action Acción que devuelve el evento click
 * @param {String} properties.label Label del botón
 * @param {String} properties.styleType Tipo del botón para llamar a su correcto style
 * @param {Boolean} properties.disabled Si es true se desabilita el botón si es false o falsy se activa
 * @param {String} properties.icon Una dirección de la imagen que se utilizará de icono en el botón
 * @param {String} properties.type Tipo del botón
 * @param {} properties.ref
 */
const Button = (properties) => {
	const styleBtn = {
		backgroundColor: '#f90 !important',
    width: '100% !important',
    height: 'max-content !important',
    padding: '15px !important',
    fontFamily: '"Gilroy" !important',
    fontSize: '1.1rem !important',
    fontWeight: '700 !important',
    color: '#fff !important',
    border: '1.7px solid #f90 !important',
    borderRadius: '50px !important',
    cursor: 'pointer !important',
    margin: '30px 0 !important',
    textTransform:'uppercase !important',
    transition: 'all .3s ease-in-out !important'
}

	const { icon } = properties;

	console.log(properties.icon);

	return (
		<button
			onClick={() => properties.action()}
			className={`main-btn ${properties.styleType}`}
			disabled={properties.disabled}
			type={properties.type || "button"}
			onMouseEnter={() => properties.hoverSwitch("enter")}
			onMouseLeave={() => properties.hoverSwitch("leave")}
		>
			{icon ? (
				<span className={properties.iconClass}>
					<img
						src={process.env.NODE_ENV === "development" ? icon : IMAGES_SERVER + icon}
						className={properties.iconClass}
						alt="..."
					/>
				</span>
			) : null}
			{properties.label}
		</button>
	);
};

export default Button;
