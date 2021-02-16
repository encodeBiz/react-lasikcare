import React, { useEffect } from "react";
import Card from "../../shared_modules/Card/Card";
import CardContainer from "../../shared_modules/CardContainer/CardContainer";
import doctorIcon from "../../assets/images/icons/doctor-color-icon.svg";
import "./AppointmentType.scss";
import { connect } from "react-redux";
import { setAppoinmentConfig } from "../../redux/appointment_config/appointmentConfig.actions";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import iconPresencial from "../../assets/images/icons/icon-presencial.svg";
import Button from "../../shared_modules/Button/Button";
import iconVideo from "../../assets/images/icons/icon-videocall.svg";
import Stepper from "../../shared_modules/Stepper/Stepper";

const AppointmentType = (properties) => {
	const homeLinksConfig = [
		{
			title: "Zu Hause",
			image: iconVideo,
			subtitle: "Online video-beratung von zu hause aus",
			url: "/videollamadas",
			type: "online",
		},
		{
			title: "Vor Ort",
			image: iconPresencial,
			subtitle: "Vor-ort baratung im nächstgegenen Lasik Care standort",
			url: "/appointments",
			type: "presencial",
		},
	];
	const history = useHistory();

	const navigateTo = (url) => history.push(url);

	useEffect(() => {
		properties.setAppoinmentConfig("currentStep", 1);
		// eslint-disable-next-line
	}, []);

	/**
	 *
	 * @param {"online" | "presencial"} type Tipo de cita
	 */

	const handleClick = (type) => {
		properties.setAppoinmentConfig("type", type);
		history.push(type === "online" ? "/videollamadas" : "/appointments");
	};

	return (
		<div className="wrapper-general">
			<Stepper currentStepIndex={properties.appointment?.currentStep} navigateTo={navigateTo} />
			<div className="top-content">
				<Button action={history.goBack} styleType={"back-button"} label={"Zurück"} />
			</div>
			<h1>1. Bitte wählen Sie Ihren Wunschtermin:</h1>
			<div className="presencial-online-wrapper">
				<CardContainer isColumn={false}>
					{homeLinksConfig.map((link, index) => {
						return (
							<Link to={link.url} key={index} className="card-link">
								<Card key={index} handleClick={handleClick} clickParam={link.type}>
									<div className="first-step-card">
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
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	/**
	 *
	 * @param {String} property  Propiedad del estado que se debe actualizar
	 * @param {String || Object || number} data Datos con los que se actualizará la propiedad anterior
	 * @description Actualiza un campo del objeto de appointment
	 */
	setAppoinmentConfig: (property, data) => dispatch(setAppoinmentConfig(property, data)),
});

export default connect(undefined, mapDispatchToProps)(AppointmentType);
