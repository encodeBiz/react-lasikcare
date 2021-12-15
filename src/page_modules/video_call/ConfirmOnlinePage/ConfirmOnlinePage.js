/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Stepper from "../../../shared_modules/Stepper/Stepper";
import CardContainer from "../../../shared_modules/CardContainer/CardContainer";
import calendarUbi from "../../../assets/images/icons/calendar.svg";
import timeUbi from "../../../assets/images/icons/time-icon.svg";
import "./ConfirmOnlinePage.scss";
import { connect } from "react-redux";
import ConfirmForm from "../../appointments/ConfirmAppointmentPage/ConfirmForm/ConfirmForm";
import moment from "moment";
import { useHistory } from "react-router";
import {
	sendAppointmentData,
	setAppoinmentConfig,
} from "../../../redux/appointment_config/appointmentConfig.actions";
import Loading from "../../../shared_modules/Loading/Loading";
import { IMAGES_SERVER } from "../../../constants/constants";
import { sendEmail } from "../../../services/email.service";

const ConfirmOnlinePage = (properties) => {
	const [children, setChildren] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const history = useHistory();
	const navigateTo = (url) => history.push(url);
	const { appointment } = properties;

	///////////////////////////////////////////
	// CONFIGURACIÓN DEL COMPONENTE
	///////////////////////////////////////////

	/**
	 * @description Setea el currentStep del store.
	 */

	useEffect(() => {
		window.scrollTo(0, 0);
		properties.setAppoinmentConfig("currentStep", 3);
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
	 * Escucha el estado de la petición y redirige en
	 * función del éxito o fracaso de la misma
	 */

	useEffect(() => {
		if (appointment.error) {
			history.push("/termin-bereits-vergeben");
		}
		if (appointment.success) {
			history.push("/danke");
		}
	}, [appointment.error, appointment.success, history]);

	/**
	 * Setea la información que recibirá el appointment summary
	 */

	const setChildrenInfo = () => {
		const hour = moment(appointment.calendar_hour.horaInicio, "HH:mm");
		const formattedHour = hour.format("HH:mm");

		const children = [
			{
				imgSource: calendarUbi,
				text: appointment.calendar_date.locale("de").format("dddd, DD.MM"),
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

	 const sendEmailClinic = async (values) => {
		const utm_source = window.utm_source || "";
		const tmr = "";

		const query_params = {
			clinic_id: appointment.type === "VIDEO" ? "GRLCV" : appointment.city.keycli,
			clinic_name: appointment.city.clinica,
			clinic_address: appointment.city.address,
			date: appointment.calendar_hour.fecha,
			hour: appointment.calendar_hour.horaInicio,
			horaFin: appointment.calendar_hour.horaFin,
			keymed: appointment.calendar_hour.keymed,
			gender: values.gender,
			first_name: values.name,
			last_name: values.surname,
			email: values.email,
			phone: '00' + values.phoneNumber,
			message: values.message,
			age: values.ageGroup,
			type: appointment.type,
			utm_source,
			tmr, //Se incluirá al final
			comentarios: values.message,
			sexo: values.gender,
			error: `This patient is older than 50`,
		};

		await sendEmail(query_params);
	};

	const  getCookie = (cname) => {
		let name = cname + "=";
		let ca = document.cookie.split(';');
		for(let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}

	/////////////////////////////
	// GESTIÓN DE EVENTOS
	/////////////////////////////

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
			setIsLoading(true);
			await properties.setAppoinmentConfig("clientData", values);
			const res = await properties.sendAppointmentData(true);
			console.log('ONLINE PAGE', res.errores)
			if(res.errores && parseInt(res.errores.cod) ===   0){
				const lead_id = res.urlFormulario.split('&keyhis=')[1];
				const session_id = getCookie('PHPSESSID')
				
				await sendEmailClinic(values); //EMAIL PARA LAS PERSONAS MAYORES DE 50
				window.dataLayer.push({
					"event": "leadSent",
					"lead_id": lead_id || Math.floor(Math.random() * 100000000),
					"session_id": session_id || Math.floor(Math.random() * 100000000),
					"lead_source": 'online_termine',
					"lead_type": "online_termine"
				});
			}
			setIsLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	const texts = {
		BIDI: "Ärztliche Voruntersuchung (ca. 40 €) Abrechnung nach GOÄ",
		BI: "Unverbindliches Informationsgespräch",
		VIDEO: "Online Video Beratung",
	};

	///////////////////////////////////////////
	// RENDERIZADO DEL COMPONENTE
	///////////////////////////////////////////

	return (
		<React.Fragment>
			<Stepper
				currentStepIndex={properties.appointment.currentStep}
				navigateTo={navigateTo}
				isVideoConference={false}
			></Stepper>
			<div className="wrapper-general change-width">
				{isLoading ? (
					<CardContainer>
						<div className="loading-center">
							<Loading />
						</div>
					</CardContainer>
				) : (
					<div className="flex-responsive">
						{/* Resumen de la cita */}
						<div className="appointment-summary">
							<h2>Ihr Wunschtermin</h2>
							<CardContainer className="change-h3">
								<h3>{texts[appointment.type]}</h3>

								<div className="summary-icon">
									{children &&
										children.map((child, index) => {
											return (
												<div className="child" key={index}>
													<img
														src={
															process.env.NODE_ENV === "development"
																? child.imgSource
																: IMAGES_SERVER + child.imgSource
														}
														alt="..."
													/>
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
								appointmentValues={appointment.clientData}
							/>
						</div>
					</div>
				)}
			</div>
		</React.Fragment>
	);
};

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

		sendAppointmentData: (isOnline) => dispatch(sendAppointmentData(isOnline)),
	};
};

const mapStateToProps = ({ appointment }) => ({
	appointment,
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmOnlinePage);
