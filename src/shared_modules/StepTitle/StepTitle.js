import React from "react";
import "./StepTitle.scss";

/**
 *
 * @param {object} properties
 * @param {string} properties.text
 */

const StepTitle = (properties) => {
	const { text, number } = properties;

	return (
		<div className="stepper-title">
			<h1>
				{number && `${number}.`} {text}
			</h1>
		</div>
	);
};

export default StepTitle;
