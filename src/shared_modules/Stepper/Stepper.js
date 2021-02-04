import React from "react";
import "./Stepper.scss";

const Stepper = ({ currentStepIndex, navigateTo }) => {

	const steps = [
		{
			stepNumber: 0,
			stepText: "Terminart",
			url: "/appointments/type",
		},
		{
			stepNumber: 1,
			stepText: "Standart",
			url: "/appointments/city",
		},
		{
			stepNumber: 2,
			stepText: "Datum",
			url: "/appointments/calendar",
		},
		{
			stepNumber: 3,
			stepText: "Ikontakdaten",
			url: "/appointments/confirm",
		},
	];

	const isActive = (step) => (currentStepIndex === step.stepNumber ? "is-active" : "");

	return (
		<React.Fragment>
			<div className="step-container">
				{steps.map((step, index) => {
					return (
						<div key={index} className={`${isActive(step)} step`} onClick={() => navigateTo(step.url)}>
							{step.stepNumber + 1}
						</div>
					);
				})}
			</div>
		</React.Fragment>
	);
};

export default Stepper;
