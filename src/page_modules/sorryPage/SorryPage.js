/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useHistory } from "react-router";
import Button from "../../shared_modules/Button/Button";
import "./SorryPage.scss";
import lens from "../../assets/images/icons/icon-search.svg";
import {
	clearAppointment,
	setAppoinmentConfig,
	getAppoinmentConfig
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
		console.log(properties.appointment.type)
		if(properties.appointment.type === 'VIDEO'){
			history.push("/termintyp/zu-hause/videoberatung");
		}else{
			history.push("/termintyp/vor-ort/voruntersuchung");
		} 
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

/**
 *
 * @param {Object} store
 * @param {Object} store.appointment Configuración de la cita hasta el momento desde redux
 * @param {Object} store.available_hours Horas disponibles por tipo y ciudad desde redux
 * @description Transforma el appointments reducer a props
 * que serán consumidas por el componente y sus hijos.
 */

 const mapStateToProps = (store) => {
	return {
		appointment: store.appointment,
		available_hours: store.available_hours
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SorryPage);
