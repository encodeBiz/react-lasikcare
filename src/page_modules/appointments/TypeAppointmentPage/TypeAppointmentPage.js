import React, { useEffect } from "react";

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

import iconFree from "../../../assets/images/icons/type-pay.svg"
import iconPay from "../../../assets/images/icons/type-free.svg"

// Estilos

import "./TypeAppointmentPage.scss";
/**
 *
 * @param {Object} properties
 * @param {Function} properties.getAppointmentByType Envía al reducer el tipo de cita que se ha seleccionado.
 *
 */

const TypeAppointmentPage = (properties) => {
	/**@description Configuración cards */

	console.log(properties.appointment)

	const appointmentTypes = [
		{
			text: "Unverbindliches Informationsgespräch + Ärltliche Voruntersuchung(ca. 40€)",
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
		properties.setAppoinmentConfig("currentStep", 2);
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
		<div className="wrapper-general">
			<Stepper currentStepIndex={properties.appointment?.currentStep} navigateTo={navigateTo} />
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
						<Card key={index} handleClick={onAppointmentTypeSelection} clickParam={typeItem.type}>
							<img src={typeItem.image} alt="..." className="type-image" />
							<p>{typeItem.text}</p>
						</Card>
					);
				})}
			</CardContainer>
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
