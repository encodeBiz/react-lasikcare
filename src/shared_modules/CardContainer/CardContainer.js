import React from "react";
import "./CardContainer.scss";

const CardContainer = ({ children, customClass, isColumn }) => {
	const isColumnClass = isColumn ? 'is-column' : '' 


	return <div className={`card-container ${isColumnClass} ${!customClass ? "" : customClass}`}>{children}</div>;
};

export default CardContainer;
