import React from "react";
import "./Card.scss";

const Card = ({ children, handleClick, clickParam, customClass = "", shouldHover = true }) => {
	const onClick = () => (handleClick ? handleClick(clickParam) : null);
	return (
		<div className={`card ${customClass} ${shouldHover ? "hoverable" : ""}`} onClick={onClick}>
			{children}
		</div>
	);
};

export default Card;
