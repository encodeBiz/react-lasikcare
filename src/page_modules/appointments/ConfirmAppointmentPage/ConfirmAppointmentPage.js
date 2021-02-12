import React, { useEffect } from "react";
import Stepper from "../../../shared_modules/Stepper/Stepper";
import CardContainer from "../../../shared_modules/CardContainer/CardContainer";
import Button from "../../../shared_modules/Button/Button";
import { setAppoinmentConfig } from "../../../redux/appointment_config/appointmentConfig.actions";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import locationUbi from "../../../assets/images/icons/location-icon.svg";
import calendarUbi from "../../../assets/images/icons/calendar-icon.svg";
import timeUbi from "../../../assets/images/icons/time-icon.svg"
import "./ConfirmAppointmentPage.scss"

const ConfirmPage = (properties) => {
	const history = useHistory()
	const navigateTo = (url) => history.push(url)



	/**
	 * @description Setea el currentStep del store.
	 */

	useEffect(() => {
		properties.setAppoinmentConfig("currentStep", 3);
		// eslint-disable-next-line
	}, []);

	return (
		<div className="wrapper-general">
			<Stepper currentStepIndex={properties.appointment.currentStep} navigateTo={navigateTo}></Stepper>
			
			<div class="appointment-summary">
			<h2>Ihr Wunschtermin</h2>
			<CardContainer>
			<h3>unverbindliches Informationsgespräch</h3>

            <div class="summary-icon">
			
			   <div class="child">
			   <img src={locationUbi}/>
			   <p>München</p>
			   </div>

			   <div class="child">
				<img src={calendarUbi}/>
				<p>29 Januar</p>
			   </div>

			   <div class="child">
			   <img src={timeUbi}/>
		       <p>12:00h</p>  
			   </div>

			</div>

			</CardContainer>

			</div>


			<div class="form-summary">
			<h2>Ihre Kontaktdaten</h2>
			<CardContainer>Form</CardContainer>
			</div>
			<Button type={"rounded-button"} label={"JETZT TERMIN VEREINBAREN"} />
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

/**
 *
 * @param {Object} state
 * @returns {Object} appointment
 * @description Transforma el appointments reducer a props
 * que serán consumidas por el componente y sus hijos.
 */

const mapStateToProps = (state) => {
	return {
		appointment: state.appointment,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmPage);
