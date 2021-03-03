import React, { useEffect, useState } from "react";

// Router

import { useHistory } from "react-router";

// Redux

import { connect } from "react-redux";
import { setAppoinmentConfig } from "../../../redux/appointment_config/appointmentConfig.actions";

// Componentes

import Button from "../../../shared_modules/Button/Button";
import CardContainer from "../../../shared_modules/CardContainer/CardContainer";
import Card from "../../../shared_modules/Card/Card";
import Stepper from "../../../shared_modules/Stepper/Stepper";

//Assets

import iconFree from "../../../assets/images/icons/type-pay.svg";
import iconPay from "../../../assets/images/icons/type-free.svg";

// Estilos

import "./TypeAppointmentPage.scss";
/**
 *
 * @param {Object} properties
 * @param {Function} properties.getAppointmentByType Envía al reducer el tipo de cita que se ha seleccionado.
 * @typedef {Object.<String: calendar_date, String: calendar_hour, Object:city, Object:clientData, Number: currentStep, String: type >} Appointment
 * @param {Appointment} properties.appointment
 */

const TypeAppointmentPage = (properties) => {
	const [stateType, setStateType] = useState(null);

	/**@description Configuración cards */

	const appointmentTypes = [
		{
			text: "Unverbindliches Informationsgespräch + ärztliche Voruntersuchung (ca. 40 €) Abrechnung nach GOÄ",
			image: iconPay,
			type: "BIDI",
		},
		{
			text: "Unverbindliches Informationsgespräch",
			image: iconFree,
			type: "BI",
		},
	];

	/**
	 * Si hay un type ya guardado en appointment se activa hasType
	 * que a su vez sirve para añadirle la clase activo
	 */

	useEffect(() => {
		if (properties.appointment.type) {
			setStateType(properties.appointment.type);
		}
		// eslint-disable-next-line
	}, [stateType]);


	/**
	 * Hook para usar la funcionalidad de history de React Router
	 */

	const history = useHistory();

	/**
	 *
	 * @param {String} url Dirección a la que se debe redirigir al usuario. Debe ser sustituido por redux
	 */

	const navigateTo = (url) => history.push(url);

	/**
	 * @description Setea el currentStep del store.
	 */

	useEffect(() => {
		properties.setAppoinmentConfig("currentStep", 1);
		// eslint-disable-next-line
	}, []);

	/**
	 *
	 * @param {String} type Tipo de cita que se seteará en el store.
	 * @description Setea el campo 'typè' del appointment reducer al tipo de cita seleccionado.
	 */

	const onAppointmentTypeSelection = (type) => {
		properties.setAppoinmentConfig("type", type);
		history.push("/appointments/calendar");
	};

	return (
	<React.Fragment>
		<Stepper currentStepIndex={properties.appointment?.currentStep} navigateTo={navigateTo} />
		<div className="wrapper-general">
			<div className="top-content">
				<Button action={history.goBack} styleType={"back-button"} label={"Zurück"} />
			</div>
			<div className="appointment-type-container">
				<div>
					<h1>2. Terminart wählen</h1>
				</div>
				<CardContainer isColumn={true}>
					{appointmentTypes.map((typeItem, index) => {
						return (
							<Card key={index} handleClick={onAppointmentTypeSelection} clickParam={typeItem.type} customClass={stateType === typeItem.type ? 'selected' : ''}>
								<img src={typeItem.image} alt="..." className="type-image" />
								<p>{typeItem.text}</p>
							</Card>
						);
					})}
				</CardContainer>
			</div>
		</div>
	</React.Fragment>

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
 * @param {Object} store
 * @returns {Object} appointment
 * @description Transforma el appointments reducer a props
 * que serán consumidas por el componente y sus hijos.
 */

const mapStateToProps = (store) => {
	return {
		appointment: store.appointment,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TypeAppointmentPage);
