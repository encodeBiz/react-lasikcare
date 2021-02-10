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
		<div className="step-container">
			<ul>
			{steps.map((step, index) => {
				return (
					<li key={index} className={`${isActive(step)} step`} onClick={() => navigateTo(step.url)}>
						<div className="circle-num"><span className="num">{step.stepNumber + 1}</span></div>
						<span className="text-step">{step.stepText}</span>
					</li>
				);
			})}
			</ul>
		</div>
	);
};

export default Stepper;
