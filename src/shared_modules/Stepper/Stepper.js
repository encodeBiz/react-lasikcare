import React from "react";
import "./Stepper.scss";

const Stepper = ({ currentStepIndex, navigateTo }) => {
	

	const steps = [
		{
			stepNumber: 0,
			stepText: "Terminart",
			url: "/type",
		},
		{
			stepNumber: 1,
			stepText: "Standart",
			url: "/appointments/type",
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

	return (
		<div className="step-container">
			{/* <ul>
				{steps.map((step, index) => {

					const isActive = step.stepNumber < currentStepIndex ? "is-active is-solid" : "is-dotted";
					return (
						<li key={index} className={`${isActive} step`} onClick={() => navigateTo(step.url)}>
							<div className={`circle-num ${step.stepNumber <= currentStepIndex ? 'circle-num-active' : 'circle-num-inactive'}`}>
								<span className={`num ${step.stepNumber <= currentStepIndex ? 'num-active' : 'num-inactive'}`}>{step.stepNumber + 1}</span>
							</div>
					
						</li>
					);
				})}
			</ul> */}


      <ul class="progressBar">
        <li>Standort</li>
        <li>Terminart</li>
        <li>Datum</li>
        <li>Kontaktdaten</li>
      </ul>

		</div>
	);
};

export default Stepper;
