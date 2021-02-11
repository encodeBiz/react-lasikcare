import React from "react";
import { Link } from "react-router-dom";
import { Switch, useHistory } from "react-router";
import Card from "../../shared_modules/Card/Card";
import CardContainer from "../../shared_modules/CardContainer/CardContainer";
import Stepper from "../../shared_modules/Stepper/Stepper";
import Button from "../../shared_modules/Button/Button";
import "./AppointmentType.scss";
import iconVideo from "../../assets/images/icons/icon-videocall.svg";
import iconPresencial from "../../assets/images/icons/icon-presencial.svg"



const AppointmentType = (properties) => {
	const homeLinksConfig = [
		{
			title: "Zu Hause",
			image: iconVideo,
			subtitle: "Online video-beratung von zu hause aus",
			url: "/videollamadas",
		},
		{
			title: "Vor Ort",
			image: iconPresencial,
			subtitle: "Vor-ort beratung im nächstgelegenen Lasik Care standort",
			url: "/appointments",
		},
	];
	const history = useHistory();

	const navigateTo = (url) => history.push(url);


	return (
		<div className="wrapper-general">
			<Stepper currentStepIndex={properties.appointment?.currentStep} navigateTo={navigateTo} />
			<div className="top-content">
				<Button action={history.goBack} styleType={"back-button"} label={"Zurück"} />
			</div> 
			<h1>
			1. Bitte wählen Sie Ihren Wunschtermin:
			</h1>
			<CardContainer isColumn={false}>
				{homeLinksConfig.map((link, index) => {
					return (
						<Link to={link.url} key={index}>
							<Card>
								<div className="home-card">
									<h3>{link.title}</h3>
									<div>
										<img className="home-card-image" src={link.image} alt="..." />
									</div>
									<p>{link.subtitle}</p>
								</div>
							</Card>
						</Link>
					);
				})}
			</CardContainer>
		</div>
	);
};
export default AppointmentType;
