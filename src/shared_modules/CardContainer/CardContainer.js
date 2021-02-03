import React from "react";
import "./CardContainer.scss";

const CardContainer = ({ children, customClass }) => {
	return <div className={`card-container ${!customClass ? "" : customClass}`}>{children}</div>;
};

export default CardContainer;
