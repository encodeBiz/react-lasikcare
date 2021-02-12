import React from "react";
import "./CardContainer.scss";

/**
 * 
 * @param {any} children Hijos de react
 * @param {String} customClass Clase de css
 * @param {Boolean} isColumn Si es true crea una columna
 *  
 */


const CardContainer = ({ children, customClass, isColumn }) => {
	const isColumnClass = isColumn ? 'is-column' : '' 


	return <div className={`card-container ${isColumnClass} ${!customClass ? "" : customClass}`}>{children}</div>;
};

export default CardContainer;
