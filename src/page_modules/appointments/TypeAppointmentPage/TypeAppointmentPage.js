import React, { useEffect } from "react";
import "./TypeAppointmentPage.scss";
import CardContainer from "../../../shared_modules/CardContainer/CardContainer";
import StepTitle from "../../../shared_modules/StepTitle/StepTitle";
import Card from "../../../shared_modules/Card/Card";
import testImage from "../../../assets/images/icons/doctor-color-icon.svg";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import Stepper from "../../../shared_modules/Stepper/Stepper";
import { setAppoinmentConfig } from "../../../redux/appointment_config/appointmentConfig.actions";

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
			image: testImage,
			type: "BIDI",
		},
		{
			text: "Unverbindliches Informationsgespräch",
			image: testImage,
			type: "BI",
		},
	];

	const history = useHistory();

	const navigateTo = (url) => history.push(url)

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
		history.push("/appointments/city");
	};

	return (
		<React.Fragment>
			<Stepper currentStepIndex={properties.appointment?.currentStep} navigateTo={navigateTo} />
			<StepTitle text={"Terminart wählen"} number={1} />
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
