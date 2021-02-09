import React, { useEffect, useState } from "react";
import CardContainer from "../../../shared_modules/CardContainer/CardContainer";
import Stepper from "../../../shared_modules/Stepper/Stepper";

import "./CityAppointmentPage.scss";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import Button from "../../../shared_modules/Button/Button";
import { componentDidUpdate } from "../../../redux/redux.helper";

import { setAppoinmentConfig } from "../../../redux/appointment_config/appointmentConfig.actions";
import SelectComponent from "../../../shared_modules/Select/Select.component";
/**
 * Seleccionde la ciudad, modifica el estado de configuracion de cita en el store
 * @param {Object} properties 
 * @param {Promise} properties.clinics Clínicas disponibles
 */
const CityAppointmentPage = (properties) => {
	const history = useHistory()
	const [clinicsState, setClinics] = useState({status: 'pending', clinics: []})
	const [selectedClinic, selectClinic] = useState(null)
	const goBack = useHistory().goBack;

	useEffect(() => {
		properties.clinics
		.then(_c => {
			setClinics(_c.clinics)
		})
	}, [clinicsState])

	

	/**
	 * Setea el currentStep del store.
	 */
	useEffect(() => {
		properties.setAppoinmentConfig("currentStep", 1);
		// eslint-disable-next-line
	}, []);

	const navigateTo = (url) => history.push(url)//


	const paintCities = ()=>{
		if(clinicsState.clinics)
		 return clinicsState.clinics.map((clinic, index)=>{
				return  {value: clinic ,label: clinic.name }
			})
		else return <h1>LOADING</h1>
	}

	const handleEventSelect = ($event)=> selectClinic($event.value);
	const handleEventAccept = () => {
		if(selectedClinic != null) properties.setAppoinmentConfig('city', selectedClinic)
	};

	return (
		<React.Fragment>
			<Stepper currentStepIndex = {properties.appointment.currentStep} navigateTo={navigateTo}/>
			<div className="top-content">
				<Button action={history.goBack} styleType={"back-button"} label={"Züruch"} />
			</div>
			<CardContainer>
			 <SelectComponent options={paintCities()} handleEvent={handleEventSelect}></SelectComponent>
			</CardContainer>
			<div className="container-row">
				<Button action={handleEventAccept} styleType={"rounded-button"} label={"fortsetzen"} />
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

const mapStateToProps = (store) => {
	return {
		appointment: store.appointment,
		clinics: store.clinics
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CityAppointmentPage);
