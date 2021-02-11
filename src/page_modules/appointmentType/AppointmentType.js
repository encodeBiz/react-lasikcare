import React, { useEffect } from "react";
import Card from "../../shared_modules/Card/Card";
import CardContainer from "../../shared_modules/CardContainer/CardContainer";
import doctorIcon from "../../assets/images/icons/doctor-color-icon.svg";
import "./AppointmentType.scss";
import { connect } from "react-redux";
import { setAppoinmentConfig } from "../../redux/appointment_config/appointmentConfig.actions";
import { useHistory } from "react-router";

const AppointmentType = (properties) => {
	const homeLinksConfig = [
		{
			title: "Zu Hause",
			image: null,
			subtitle: "Online video-beratung von zu hause aus",
			url: "/videollamadas",
			type: "online",
		},
		{
			title: "Vor Ort",
			image: null,
			subtitle: "Vor-ort beratung im nächstgelegenen Lasik Care standort",
			url: "/appointments",
			type: "presencial",
		},
	];

	const history = useHistory()

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
		history.push(type === "online" ? "/videollamadas" : "/appointments") 
	};

	return (
		<React.Fragment>
			<h1 className="main-title">
				Bitte wählen Sie Ihren <br /> Wunschtermin
			</h1>
			<CardContainer isColumn={false}>
				{homeLinksConfig.map((link, index) => {
					return (
						<Card key={index} handleClick={handleClick} clickParam={link.type}>
							<div className="home-card">
								<h3>{link.title}</h3>
								<div>
									<img className="home-card-image" src={doctorIcon} alt="..." />
								</div>
								<p>{link.subtitle}</p>
							</div>
						</Card>
					);
				})}
			</CardContainer>
		</React.Fragment>
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
