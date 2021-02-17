import React, { useEffect, useState } from "react";
import Stepper from "../../../shared_modules/Stepper/Stepper";
import CardContainer from "../../../shared_modules/CardContainer/CardContainer";
import {
	sendAppointmentData,
	setAppoinmentConfig,
} from "../../../redux/appointment_config/appointmentConfig.actions";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import locationUbi from "../../../assets/images/icons/location-icon.svg";
import calendarUbi from "../../../assets/images/icons/calendar-icon.svg";
import timeUbi from "../../../assets/images/icons/time-icon.svg";
import "./ConfirmAppointmentPage.scss";
import moment from "moment";
import "moment/locale/de";
import ConfirmForm from "./ConfirmForm/ConfirmForm";
import "../../../styles/App.scss";

const ConfirmPage = (properties) => {
	const [children, setChildren] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const history = useHistory();
	const navigateTo = (url) => history.push(url);

	const { appointment } = properties;

	/**
	 * @description Setea el currentStep del store.
	 */

	useEffect(() => {
		properties.setAppoinmentConfig("currentStep", 3);
		// eslint-disable-next-line
	}, []);

	/**
	 * @see setChildrenInfo
	 */

	useEffect(() => {
		if (appointment.calendar_hour && appointment.calendar_date) {
			setChildrenInfo();
		}
		// eslint-disable-next-line
	}, [appointment]);

	/**
	 * Setea la información que recibirá el appointment summary 
	 */

	const setChildrenInfo = () => {
		const hour = moment(appointment.calendar_hour.horaInicio, "HH:mm");
		const formattedHour = hour.format("HH:mm");

		const children = [
			{
				imgSource: locationUbi,
				text: appointment.city.name,
			},
			{
				imgSource: calendarUbi,
				text: appointment.calendar_date.locale("de").format("dddd DD"),
			},
			{
				imgSource: timeUbi,
				text: formattedHour,
			},
		];

		setChildren(children);
	};

	/**
	 *
	 * @param {Object} values
	 * @param {String} values.name
	 * @param {String} values.surname
	 * @param {String} values.gender
	 * @param {String} values.phoneNumber
	 * @param {String} values.email
	 * @param {Boolean} values.message
	 * @param {Boolean} values.isOlderThan50
	 *
	 * Se setea en el estado global los datos del cliente y se llama a la acción de Redux que hará la llamada a la API
	 * Una vez completada la llamada se setea el localStorage
	 * Completado todo se redirecciona a la página de gracias.
	 *
	 */

	const handleSubmit = async (values) => {
		try {
			await properties.setAppoinmentConfig("clientData", values);
			// await properties.sendAppointmentData();
			const city = appointment.city.name;
			localStorage.setItem("city", city);
			setTimeout(() => {
				history.push("/appointments/thank");
			}, 1000)
			
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="wrapper-general">
			<Stepper
				currentStepIndex={properties.appointment.currentStep}
				navigateTo={navigateTo}
			></Stepper>

			{/* Resumen de la cita */}

			<div className="flex-responsive">
				<div className="appointment-summary">
					<h2>Ihr Wunschtermin</h2>
					<CardContainer className="change-h3">
						<h3>unverbindliches Informationsgespräch</h3>

						<div className="summary-icon">
							{children &&
								children.map((child, index) => {
									return (
										<div className="child" key={index}>
											<img src={child.imgSource} alt="..." />
											<p>{child.text}</p>
										</div>
									);
								})}
						</div>
					</CardContainer>
				</div>

				{/* Formulario */}
				<div className="wrapper-form">
					<ConfirmForm
						handleSubmit={handleSubmit}
						errorMessage={errorMessage}
						setErrorMessage={setErrorMessage}
						appointmentValues = {appointment.clientData}
					/>
				</div>
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

		/**
		 * Todos los parámetros se consiguen del estado
		 * @see sendAppointmentData
		 */

		sendAppointmentData: () => dispatch(sendAppointmentData()),
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
