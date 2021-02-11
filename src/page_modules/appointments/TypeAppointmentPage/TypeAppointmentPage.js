import React, { useEffect } from "react";
import "./TypeAppointmentPage.scss";
import CardContainer from "../../../shared_modules/CardContainer/CardContainer";
import Card from "../../../shared_modules/Card/Card";
import testImage from "../../../assets/images/icons/doctor-color-icon.svg";
import { connect } from "react-redux";
import { Switch, useHistory } from "react-router";
import Stepper from "../../../shared_modules/Stepper/Stepper";
import { setAppoinmentConfig } from "../../../redux/appointment_config/appointmentConfig.actions";
import Button from "../../../shared_modules/Button/Button";
import iconFree from "../../../assets/images/icons/type-pay.svg"
import iconPay from "../../../assets/images/icons/type-free.svg"
import { RouteWithSubRoutes } from "../../../router/RouterHelper";

/**
 *
 * @param {Object} properties
 * @param {Function} properties.getAppointmentByType Envía al reducer el tipo de cita que se ha seleccionado.
 *
 */

const TypeAppointmentPage = (properties) => {
	/**@description Configuración cards */

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

	const history = useHistory();

	const navigateTo = (url) => history.push(url);

	/**
	 * @description Setea el currentStep del store.
	 */

	useEffect(() => {
		properties.setAppoinmentConfig("currentStep", 0);
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
		<div class="wrapper-general">
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
