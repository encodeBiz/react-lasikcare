import React, { useEffect } from "react";
import Stepper from "../../../shared_modules/Stepper/Stepper";
import CardContainer from "../../../shared_modules/CardContainer/CardContainer";
import Button from "../../../shared_modules/Button/Button";
import { setAppoinmentConfig } from "../../../redux/appointment_config/appointmentConfig.actions";
import { connect } from "react-redux";
import { useHistory } from "react-router";

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
		<div>
			<Stepper currentStepIndex={properties.appointment.currentStep} navigateTo={navigateTo}></Stepper>
			
			<CardContainer>Appointment data</CardContainer>
			
			<CardContainer>Form</CardContainer>
			<Button type={"rounded-button"} label={"Rounded"} />
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
