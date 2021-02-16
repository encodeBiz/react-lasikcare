import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import CardContainer from "../../../shared_modules/CardContainer/CardContainer";
import "./ThankAppointmentPage.scss";
import moment from "moment";
import locationUbi from "../../../assets/images/icons/location-icon.svg";
import calendarUbi from "../../../assets/images/icons/calendar-icon.svg";
import timeUbi from "../../../assets/images/icons/time-icon.svg";
import { setAppoinmentConfig } from "../../../redux/appointment_config/appointmentConfig.actions";
import iconThanks  from "../../../assets/images/icons/icon-thanks.svg"

/**
 *
 * @param {Object} properties
 * @param {Object} properties.appointment
 *
 */

const ThankAppointmentPage = (properties) => {
	const { appointment } = properties;
	const [children, setChildren] = useState([]);

	const info = [
		{ 
			title: "Termininformation",
			text:
				`Sie erhalten eine automatisierte <span> E-Mail</span> mit der Zusammenfassung Ihrer Terminanfrage und der <span> Adresse Ihres Termins</span>.`,
		},
		{
			title: "Weiterleitung",
			text:
				"Wir leiten <span>Ihren Terminwunsch</span> an das Kundenzentrum und die Klinik weiter. Sollten noch weitere Informationen benötigt werden, <span>melden wir uns telefonisch</span> bei Ihren",
		},
		{
			title: "Terminbestätigung",
			text:
				"Nach positiver Prüfung Ihres <span>Terminwunsches</span> durch die Klinik erhalten Sie Ihre Terminbestätigung.",
		},
	];

	/**
	 * @description Setea el currentStep del store.
	 */

	useEffect(() => {
		properties.setAppoinmentConfig("currentStep", 4);
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

		setChildren(children);
	};
	const thankYouTexts = {
		BI: "Unverbindliches Informationsgespräch",
		BIDI: "Unverbindliches Informationsgespräch + Ärltliche Voruntersuchung(ca. 40€)",
	};

	return (
		<div className="wrapper-general">

			<CardContainer>
				<div className="thank-you-message">
					<div class="icon-thanks">
						<img src={iconThanks} alt="Thank you logo" />
					</div>
					<h3>Vielen Dank</h3>
					<p>
					    Ihr Terminwusch für <strong> {thankYouTexts[appointment.type]} </strong> ist bei uns
						eingegangen. Wir haben Ihnen eine Bestätigung an
						<strong> {appointment.clientData.email} </strong>
						gesendet.
					</p>
				</div>
			</CardContainer>

			<div class="flex-desktop">

			<div className="appointment-summary">

				<CardContainer className="change-h3">
					<h3>esto es dinamico</h3>

					<div className="summary-icon">
						{children &&
							children.map((child, index) => {
								return (
									<div className="child" key={index}>
										<img src={child.imgSource} alt="..." />
										<p>{child.text}</p>
									</div>
								);
							})}
					</div>
				</CardContainer>
			</div>
			
            <div class="wrapper-instructions">
			 <h2>Wie es weiter geht</h2>
			    <CardContainer>
				{info.map((item, index) => {
					return (
					  <div class="instructions">

						<div className="info-item" key={index}>
							<h5>{item.title}</h5>
							<p dangerouslySetInnerHTML={{__html: item.text}}></p>
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
	};
};

const mapStateToProps = (state) => ({
	appointment: state.appointment,
});

export default connect(mapStateToProps, mapDispatchToProps)(ThankAppointmentPage);
