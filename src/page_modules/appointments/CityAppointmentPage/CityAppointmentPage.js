import React, { useEffect } from "react";
import CardContainer from "../../../shared_modules/CardContainer/CardContainer";
import Stepper from "../../../shared_modules/Stepper/Stepper";

import "./CityAppointmentPage.scss";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import Button from "../../../shared_modules/Button/Button";
import { setAppoinmentConfig } from "../../../redux/appointment_config/appointmentConfig.actions";

const CityAppointmentPage = (properties) => {
	const history = useHistory()

	/**
	 * @description Setea el currentStep del store.
	 */

	useEffect(() => {
		properties.setAppoinmentConfig("currentStep", 1);
		// eslint-disable-next-line
	}, []);

	const navigateTo = (url) => history.push(url)


	return (
		<React.Fragment>
			<Stepper currentStepIndex = {properties.appointment.currentStep} navigateTo={navigateTo}/>
			<div className="top-content">
				<Button action={history.goBack} type={"back-button"} label={"Züruch"} />
			</div>
			<CardContainer></CardContainer>
			<Button type={"rounded-button"} label={"Rounded"} />
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

const mapStateToProps = (state) => {
	return {
		appointment: state.appointment,
		
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CityAppointmentPage);
