import React, { useEffect, useState } from "react";
import "./Stepper.scss";
import {appointmentSteps, videoConferenceSteps} from "../../constants/constants"

/**
 * 
 * @param {Number} currentStepIndex Índice que indica el paso en el que se encuentra
 * el usuario
 * @param {boolean} isVideoConference Nos indica si debemos utilizar 
 * un array de steps u otro. Si no está definido o es falso utilizaremos {appoinmentsSteps}
 * si no {videoConferenceSteps} 
 * @returns 
 */

const Stepper = ({ currentStepIndex, isVideoConference}) => {

	const [steps, setSteps] = useState([])

	useEffect(() => {
		setSteps(isVideoConference ? videoConferenceSteps : appointmentSteps);
	}, [isVideoConference, steps])

	return (
		<div className="step-container">
			<ul className="progress-bar">
				{steps.map((step, index) => {
					const isActive = step.stepNumber <= currentStepIndex ? "is-active is-solid" : "is-dotted";
					return (
						<React.Fragment key={index}>
							<li data-content={step.stepNumber + 1} className={isActive}>
								{step.stepText}
							</li>
						</React.Fragment>
					);
				})}
			</ul>
		</div>
	);
};

export default Stepper;
