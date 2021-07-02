import React, { useEffect } from "react";
import Card from "../../shared_modules/Card/Card";
import CardContainer from "../../shared_modules/CardContainer/CardContainer";
import "./AppointmentType.scss";
import { connect } from "react-redux";
import { setAppoinmentConfig } from "../../redux/appointment_config/appointmentConfig.actions";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import iconPresencial from "../../assets/images/icons/icon-presencial.svg";
import Button from "../../shared_modules/Button/Button";
import iconVideo from "../../assets/images/icons/icon-videocall.svg";
import Stepper from "../../shared_modules/Stepper/Stepper";
import { IMAGES_SERVER } from "../../constants/constants";

const AppointmentType = (properties) => {
	const homeLinksConfig = [
		{
			title: "Zu Hause",
			image: iconVideo,
			subtitle: "Persönliche Video Beratung",
			url: "/termintyp/zu-hause/videoberatung",
			type: "VIDEO",
		},
		{
			title: "Vor Ort",
			image: iconPresencial,
			subtitle: "Persönliche Beratung im nächstgelegenen LasikCare Standort",
			url: "/termintyp/vor-ort/",
			type: "presencial",
		},
	];

	const history = useHistory();

	const navigateTo = (url) => history.push(url);

	/**
	 * Setea el paso del proceso en el que estamos
	 */

	useEffect(() => {
		properties.setAppoinmentConfig("currentStep", 1);
		properties.setAppoinmentConfig("isOnline", false);
		// eslint-disable-next-line
	}, []);

	/**
	 *
	 * @param {"online" | "presencial"} type Tipo de cita
	 * Se encarga de setear en redux el tipo de cita elegido.
	 * Una vez hecho se redirige hacia el tipo de cita elegido
	 */

	const handleClick = (type) => {
		properties.setAppoinmentConfig("type", type);
		history.push(type === "online" ? "/termintyp/zu-hause/videoberatung" : "/termintyp/vor-ort/");
	};

	const goBack = () => history.push("/");

	return (
		<React.Fragment>
			<Stepper currentStepIndex={properties.appointment?.currentStep} navigateTo={navigateTo} />
			<div className="wrapper-general">
				<div className="top-content">
					<Button action={goBack} styleType={"back-button"} label={"Zurück"} />
				</div>
				<h1>Bitte wählen Sie Ihren Wunschtermin</h1>
				<div className="presencial-online-wrapper">
					<CardContainer>
						{homeLinksConfig.map((link, index) => {
							return (
								<Link to={link.url} key={index} className="card-link">
									<Card key={index} handleClick={handleClick} clickParam={link.type}>
										<div className="first-step-card">
											<h3>{link.title}</h3>
											<div>
												<img
													className="home-card-image"
													src={
														process.env.NODE_ENV === "development"
															? link.image
															: IMAGES_SERVER + link.image
													}
													alt="..."
												/>
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

const mapStateToProps = (state) => ({
	appointment: state.appointment,
});

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentType);
