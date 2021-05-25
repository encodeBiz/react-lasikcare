import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import CardContainer from "../../../shared_modules/CardContainer/CardContainer";
import "./ThankAppointmentPage.scss";
import moment from "moment";
import locationUbi from "../../../assets/images/icons/location-icon.svg";
import calendarUbi from "../../../assets/images/icons/calendar.svg";
import timeUbi from "../../../assets/images/icons/time-icon.svg";
import {
	clearAppointment,
	setAppoinmentConfig,
} from "../../../redux/appointment_config/appointmentConfig.actions";
import iconThanks from "../../../assets/images/icons/icon-thanks.svg";
import { IMAGES_SERVER } from "../../../constants/constants";

/**
 *
 * @param {Object} properties
 * @param {Object} properties.appointment
 *
 */

const ThankAppointmentPage = (properties) => {
	const { appointment } = properties;
	const [children, setChildren] = useState([]);
	const [appointmentType, setAppointmentType] = useState("");

	const info = [
		{
			title: "Terminbestätigung",
			text: `Sie erhalten eine automatisierte E-Mail mit der Zusammenfassung der Termininformationen. Bitte überprüfen Sie den Eingang der E-Mail in Ihrem Posteingang oder Spam-Ordner.`,
		},
		{
			title: "Weiterleitung",
			text: "Sie erhalten am Tag Ihrer persönlichen Videoberatung von uns eine E-Mail mit dem Zugangslink über E-Mail zugeschickt.",
		},
		{
			title: "Terminbestätigung",
			text: "Nach positiver Prüfung Ihres Terminwunsches durch die Klinik erhalten Sie Ihre Terminbestätigung.",
		},
	];

	/**
	 *  Setear nueva ciudad en el localStorage
	 * 	Borrar el localStorage temporal
	 * 	Borrar el estado de appointment
	 *
	 */

	useEffect(() => {
		setCityInStorage(appointment.city);
		setAppointmentType(appointment.type);
		clearTempCities();
		clearReduxAppointmentState();
		// eslint-disable-next-line
	}, []);

	/**
	 * @see setChildrenInfo
	 */

	useEffect(() => {
		if (appointment.calendar_hour && appointment.calendar_date) {
			setChildrenInfo();
		}
		// eslint-disable-next-line
	}, [appointment]);

	/**
	 * Setea la información que recibirá el appointment summary
	 */

	const setCityInStorage = (newCity) => localStorage.setItem("cities", JSON.stringify(newCity));

	/**
	 * Limpia las ciudades temporales del storage
	 */

	const clearTempCities = () => localStorage.removeItem("tempCities");

	/**
	 * Limpia el estado de redux
	 */

	const clearReduxAppointmentState = () => properties.clearAppointment();

	const setChildrenInfo = () => {
		const hour = moment(appointment.calendar_hour.horaInicio, "HH:mm");
		const formattedHour = hour.format("HH:mm");

		const children = [
			{
				imgSource: locationUbi,
				text: appointment.city.name,
			},

			{
				imgSource: calendarUbi,
				text: appointment.calendar_date.locale("de").format("dddd DD"),
			},
			{
				imgSource: timeUbi,
				text: formattedHour,
			},
		];

		if (appointment.type === "VIDEO") {
			children.shift();
		}

		setChildren(children);
	};
	const thankYouTexts = {
		BI: "Unverbindliches Informationsgespräch",
		BIDI: "Unverbindliches Informationsgespräch + Ärltliche Voruntersuchung(ca. 40€)",
		VIDEO: "Online\n video-beratung von zu hause aus",
	};

	return (
		<div className="wrapper-general change-width">
			<CardContainer>
				<div className="thank-you-message">
					<div>
						<img
							src={process.env.NODE_ENV === "development" ? iconThanks : IMAGES_SERVER + iconThanks}
							alt="Thank you logo"
						/>
					</div>
					<h3>Vielen Dank</h3>
					<p>
						Ihr Terminwusch für <strong> {thankYouTexts[appointmentType]} </strong> ist bei uns
						eingegangen. Wir haben Ihnen eine Bestätigung an
						<strong> {appointment.clientData.email} </strong>
						gesendet.
					</p>
				</div>
			</CardContainer>

			<div className="flex-desktop">
				<div className="appointment-summary">
					<CardContainer isColumn={true}>
						<h3>{thankYouTexts[appointmentType]}</h3>

						<div className="summary-icon">
							{children &&
								children.map((child, index) => {
									return (
										<div className="child" key={index}>
											<img
												src={
													process.env.NODE_ENV === "development"
														? child.imgSource
														: IMAGES_SERVER + child.imgSource
												}
												alt="..."
											/>
											<p>{child.text}</p>
										</div>
									);
								})}
						</div>
					</CardContainer>
				</div>

				<div className="wrapper-instructions">
					<h2>Wie es weiter geht</h2>
					<CardContainer>
						{info.map((item, index) => {
							return (
								<div className="instructions" key={index}>
									<div className="info-item">
										<h5>{item.title}</h5>
										<p dangerouslySetInnerHTML={{ __html: item.text }}></p>
									</div>
								</div>
							);
						})}
					</CardContainer>
				</div>
			</div>
		</div>
	);
};

/**
 *
 * @param {Function} dispatch
 * @description Transforma las acciones de redux en props
 *
 */

const mapDispatchToProps = (dispatch) => {
	return {
		/**
		 *
		 * @param {String} property  Propiedad del estado que se debe actualizar
		 * @param {String || Object || number} data Datos con los que se actualizará la propiedad anterior
		 * @description Actualiza un campo del objeto de appointment
		 */
		setAppoinmentConfig: (property, data) => dispatch(setAppoinmentConfig(property, data)),

		/**
		 * Limpia el estado de Redux del appointment
		 */

		clearAppointment: () => dispatch(clearAppointment()),
	};
};

const mapStateToProps = (state) => ({
	appointment: state.appointment,
});

export default connect(mapStateToProps, mapDispatchToProps)(ThankAppointmentPage);
