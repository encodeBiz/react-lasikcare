/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
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

const SorryPage = (properties) => {
	const history = useHistory();

	const goToCalendar = () => {
		setAppoinmentConfig("type", "BIDI");
		history.push("/termintyp/vor-ort/datum/");
	};
	const goToHome = () => (window.location.href = "https://www.lasikcare.de/");

	const { clearAppointment } = properties;

	// useEffect(() => {
	// 	clearAppointment();
	// }, []);

	return (
		<div className="wrapper-general">
			<div className="wrapper-img">
				<img src={process.env.NODE_ENV ? lens : IMAGES_SERVER + lens} alt="" />
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
					styleType={"rounded-button small-margin"}
					label="KONTAKTIEREN SIE UNS"
					action={() => goToHome()}
				></Button>
				<Button
					styleType={"transparent-button small-margin"}
					label="ZURÜCK ZU TERMINAUSWAHL"
					action={() => goToCalendar()}
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
