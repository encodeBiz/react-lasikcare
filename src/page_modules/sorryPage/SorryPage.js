/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useHistory } from "react-router";
import Button from "../../shared_modules/Button/Button";
import "./SorryPage.scss";
import lens from "../../assets/images/icons/icon-search.svg";
import {
	clearAppointment,
	setAppoinmentConfig,
} from "../../redux/appointment_config/appointmentConfig.actions";
import { connect } from "react-redux";
import { IMAGES_SERVER } from "../../constants/constants";
import telephone from "../../assets/images/icons/icon_sorrypage_tlf.svg";
import telephoneOrange from "../../assets/images/icons/icon_sorrypage_tlf_orange.svg";
import calendar from "../../assets/images/icons/icon_sorrypage_calendar.svg";
import calendarWhite from "../../assets/images/icons/icon_sorrypage_calendar_white.svg";

const SorryPage = (properties) => {
	const history = useHistory();
	const [telIcon, setTelIcon] = useState(telephone);
	const [calIcon, setCalIcon] = useState(calendar);

	const goToCalendar = () => {
		setAppoinmentConfig("type", "BIDI");
		history.push("/termintyp/vor-ort/datum/");
	};
	const goToHome = () => (window.location.href = "tel:080088886060");

	// const { clearAppointment } = properties;

	// useEffect(() => {
	// 	clearAppointment();
	// }, []);

	const setTelephoneButtonIcon = (hoverProp) =>
		setTelIcon(hoverProp === "enter" ? telephoneOrange : telephone);
	const setCalendarButtonIcon = (hoverProp) =>
		setCalIcon(hoverProp === "enter" ? calendarWhite : calendar);

	return (
		<div className="wrapper-general">
			<div className="wrapper-img">
				<img src={process.env.NODE_ENV === "development" ? lens : IMAGES_SERVER + lens} alt="" />
			</div>

			<div className="wrapper-text">
				<h2 className="uns-leid">Es tut uns leid</h2>
				<p>
					Es scheint, dass der gewählte Termin vor <br />
					kurzem vergeben wurde. Gerne helfen wir Ihnen, <br />
					einen anderen Termin zu finden.
				</p>
			</div>
			<div className="buttons-container">
				<Button
					styleType={"rounded-button small-margin rld-churumbel"}
					type={"rounded-button"}
					label="0800.8888.60.60"
					action={() => goToHome()}
					icon={telIcon}
					iconClass={"white-icon"}
					hoverSwitch={setTelephoneButtonIcon}
				></Button>
				<Button
					styleType={"transparent-button small-margin rld-churumbel"}
					label="ZURÜCK ZU TERMINAUSWAHL"
					action={() => goToCalendar()}
					icon={calIcon}
					iconClass={"orange-icon"}
					hoverSwitch={setCalendarButtonIcon}
				></Button>
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

	clearAppointment: () => dispatch(clearAppointment()),
});

export default connect(undefined, mapDispatchToProps)(SorryPage);
