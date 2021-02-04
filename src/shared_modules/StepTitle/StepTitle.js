import React from "react";
import "./StepTitle.scss";

/**
 *
 * @param {object} properties
 * @param {string} properties.text
 * @param {string} properties.type
 */

const Title = (properties) => {
	const { text, number } = properties;

	return (
		<div className={`stepper-title ${properties.type}`}>
			<h1>
				{number && `${number}.`} {text}
			</h1>
		</div>
	);
};

export default Title;
