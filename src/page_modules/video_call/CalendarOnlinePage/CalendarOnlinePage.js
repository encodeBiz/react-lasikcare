/* eslint-disable react-hooks/exhaustive-deps */
import "./CalendarOnlinePage.scss";
import { connect } from "react-redux";
import { setAppoinmentConfig } from "../../../redux/appointment_config/appointmentConfig.actions";
import { useHistory } from "react-router";
import Button from "../../../shared_modules/Button/Button";
import Calendar from "../../../shared_modules/Calendar/Calendar";
import CardContainer from "../../../shared_modules/CardContainer/CardContainer";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import Stepper from "../../../shared_modules/Stepper/Stepper";
import useWindowSize from "../../../hooks/useWindowSize";
import { fetchOnlineAvailableHours } from "../../../redux/available_online_hours/available_online_hours.actions";
import Loading from "../../../shared_modules/Loading/Loading";
import Card from "../../../shared_modules/Card/Card";
import opcionOne from "../../../assets/images/icons/type-free.svg";
import opcionTwo from "../../../assets/images/icons/calendar-icon.svg";
import { IMAGES_SERVER } from "../../../constants/constants";
import { updateAvailableHours } from "../../../redux/available_hours/available_hours.actions";
import { sendErrorEmail } from "../../../services/email.service";

const CalendarOnlinePage = (properties) => {
	const history = useHistory();
	const today = moment();
	const { width } = useWindowSize();
	const buttonRef = useRef(null);
	const [calendarWidth, setCalendarWidth] = useState(null);
	const [activeIndex, setActiveIndex] = useState(null);
	const [dataCalendar, setDataCalendar] = useState([]);
	const [selectedDate, setSelectedDate] = useState(null);
	const [initialMonth, setInitialMonth] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [initialDate] = useState(today);
	const currentMonthNumber = moment(today, "DD/MM/YYYY").format("M");
	const [currentMonth, setCurrentMonth] = useState(currentMonthNumber);
	const { appointment, online_available_hours, available_hours } = properties;
	const hasSentEmail = JSON.parse(localStorage.getItem("hasSentEmail"));

	const buttonsConfig = [
		{
			text: "Online Video-Beratung von zu Hause aus",
			type: "VIDEO",
			img: opcionOne,
		},
		{
			action: "Ärztliche Voruntersuchung (ca. 40 €) Abrechnung nach GOÄ",
			text: "Ärztliche Voruntersuchung (ca. 40 €) Abrechnung nach GOÄ",
			// label: "40€",
			type: "BIDI",
			img: opcionTwo,
			path: "/termintyp/vor-ort/datum/",
		},
	];

	///////////////////////////////////////////
	// CONFIGURACIÓN DEL COMPONENTE
	///////////////////////////////////////////

	/**
	 * Seteo del current step, de la ciudad y el tipo de consulta seleccionada
	 */

	useEffect(() => {
		properties.setAppoinmentConfig("currentStep", 2);
		setCurrentMonth(moment(today, "DD/MM/YYYY").format("M"));
	}, []);

	/**
	 * @description Gestiona la llegada de datos procedentes de Redux store
	 */

	useEffect(() => {
		let data;

		if (appointment.type === "VIDEO") {
			data = online_available_hours[currentMonth.toString()] ?? undefined;
		} else if (appointment.type === "BIDI") {
			data =
				available_hours[appointment.city.keycli].data.BIDI[currentMonth.toString()] ?? undefined;
			if (data.length <= 5 && !hasSentEmail[currentMonth]) {
				handleSendErrorEmail();
				localStorage.setItem("hasSentEmail", JSON.stringify({ [currentMonth]: true }));
			}
		}

		if (data && data.length > 0) {
			const formattedDates = formatDates(data);
			setDataCalendar(formattedDates);
		} else {
			setDataCalendar([]);
		}
	}, [currentMonth, online_available_hours, selectedDate]);

	/**
	 * @description Setea la anchura del calendario
	 * para adaptarlo a diferentes tamaños de pantalla.
	 */

	useEffect(() => {
		setCalendarWidth(formatCalendarWidth(width));
	}, [width]);

	/**
	 * Se ejecuta cuando las peticiones al servidor ya han terminado
	 */

	useEffect(() => {
		if (!properties.loading.onlineGlobalLoading) {
			getInitialMonth(online_available_hours);
		}
	}, [properties.loading.onlineGlobalLoading]);

	/**
	 *
	 * @param {Number} width
	 * Formatea la anchura del calendario para ajustarla a la anchura de la ventana
	 */

	const formatCalendarWidth = (width) => {
		//a partir de 1080 no debe ejecutarse la función
		if (width <= 360) return 35;
		else if (width <= 414 || width <= 1080) return 40;
		else if (width <= 980) return 50;
		else return 50;
	};

	/**
	 * Hace un loop sobre una lista de meses y
	 * si el mes está vacío pasa al siguiente
	 * hasta que se encuentre uno que no lo está
	 * @param {Object} appointmentObject Objeto con los meses guardados en el store
	 * @returns {string} retorna el numero del mes en formato string
	 */

	const getInitialMonth = (appointmentObject) => {
		let addToMonth = 0;
		const months = Object.values(appointmentObject);

		// Si no hay ninguna fecha en los próximos meses se debe de retornar

		if (months.every === undefined) {
			return setInitialMonth(addToMonth);
		}

		// De lo contrario se suma 1 por cada mes consecutivo sin fechas disponibles.
		for (let month in months) {
			if (!month) {
				addToMonth++;
			} else {
				return setInitialMonth(addToMonth);
			}
		}
	};

	// /////////////////////////////
	// // GESTIÓN DE EVENTOS
	// /////////////////////////////

	/**
	 * ***************************************************************
	 * MES SIGUIENTE/ANTERIOR
	 * ***************************************************************
	 */

	/**
	 *
	 * @param {Date} currentDate
	 * Cuando se pulsa en el botón de siguiente mes del calendario se hace una
	 * llamada para conseguir los huecos del mes siguiente
	 *
	 */

	const onNextMonthClick = async (currentDate) => {
		try {
			// // Setea currentMonth al mes actual

			const month = moment(today, "DD/MM/YYYY").format("M");

			setCurrentMonth(month);

			// Si está cargando todavía retornar

			// Se setea la fecha seleccionada a null para que desaparezcan las horas seleccionadas
			setSelectedDate(null);

			// Setea la fecha del que se pasará al action. Se añade un mes exacto

			if (appointment.type === "VIDEO") {
				const date = moment(currentDate).add(2, "month").format("DD/M/YYYY");
				await properties.fetchOnlineAvailableHours(date);
				setCurrentMonth((Number(currentMonth) + 1).toString());

				getInitialMonth(online_available_hours);
			} else {
				const date = moment(currentDate).add(1, "month").format("DD/M/YYYY");
				const nextMonth = (Number(currentMonth) + 3).toString();
				setCurrentMonth((Number(currentMonth) + 1).toString());
				await properties.updateAvailableHours(
					appointment.city.keycli,
					appointment.type,
					date,
					nextMonth
				);
				getInitialMonth(available_hours);
			}
		} catch (error) {
			console.log(error);
		}
	};

	/**
	 * Cuando se va al mes anterior se resta uno al currentMonth
	 */

	const onPreviousMonthClick = () => {
		setSelectedDate(null);
		setCurrentMonth((Number(currentMonth) - 1).toString());
	};

	/**
	 * ***************************************************************
	 * SELECCIÓN DE FECHAS
	 * ***************************************************************
	 */

	/**
	 *
	 * @param {Object} date fecha de moment
	 *
	 */

	const handleDateChange = (date) => {
		// Se setea a null para evitar que salga una hora por defecto

		if (activeIndex !== null) {
			setActiveIndex(null);
			properties.setAppoinmentConfig("calendar_hour", null);
		}

		const finded = dataCalendar.filter((item) => {
			return item.formattedDate.format("DD-MM-yyyy") === date.format("DD-MM-yyyy");
		});
		setSelectedDate(finded);
		properties.setAppoinmentConfig("calendar_date", date);
	};

	/**
	 *
	 * @param {Object} hour
	 * @param {Number} index
	 * Setea la hora seleccionada
	 *
	 */

	const handleSelectedHour = (hour, index) => {
		properties.setAppoinmentConfig("calendar_hour", hour);
		setActiveIndex(index);
		handleScroll();
	};

	/**
	 * ***************************************************************
	 * SELECCIÓN DE FECHAS
	 * ***************************************************************
	 */

	/**
	 *
	 * @param {String} type Tipo de cita seleccionado
	 */

	const handleClick = async (type) => {
		try {
			setIsLoading(true);
			await properties.setAppoinmentConfig("type", type);

			setCurrentMonth(moment(today, "DD/MM/YYYY").format("M"));

			const dates =
				type === "BIDI"
					? await available_hours[appointment.city.keycli].data.BIDI[currentMonth]
					: await online_available_hours[currentMonth];

			const filteredData = formatDates(dates);

			setDataCalendar(filteredData);

			setSelectedDate(null);

			setIsLoading(false);
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	};

	///////////////////////////////////////////
	// HELPERS
	///////////////////////////////////////////

	/**
	 *
	 * @param {Array.<{
	 * 		fecha: String,
	 * 		horaFin: String,
	 * 		horaInicio: String,
	 * 		horaRealCita: String,
	 * 		keymed: String}>} data
	 *
	 *
	 * Formatea los datos provenientes del store para que puedan ser consumidos por el calendario
	 */

	const formatDates = (data) => {
		if (data && data.length > 0) {
			const formattedDates = data.map((item) => {
				const date = item.fecha.split("/");
				const formattedDate = new Date(parseInt(date[2]), parseInt(date[1]) - 1, parseInt(date[0]));
				return { ...item, formattedDate: moment(formattedDate) };
			});

			return formattedDates;
		}
	};

	/**
	 * Una vez se ha seleccionado la fecha y la hora se activa esta función en el click del botón
	 */

	const onConfirmHour = () => history.push("/termintyp/videoberatung/kontaktdaten");

	/**
	 * Scroll cuando se selecciona una nueva hora
	 */

	/**
	 * Scroll cuando se selecciona una nueva hora
	 */

	const handleScroll = () => {
		if (buttonRef) {
			buttonRef.current.scrollIntoView(false, { behavior: "smooth" });
		}
	};

	const redirectToTypes = () => {
		history.push("/termintyp");
	};

	///////////////////////////////////////////
	// ENVÍO DE ERRORES
	///////////////////////////////////////////

	/**
	 *
	 */
	const handleSendErrorEmail = async () => {
		const utm_source = window.utm_source || "";
		const tmr = "";

		const query_params = {
			clinic_id: appointment.type === "VIDEO" ? "GRLCV" : appointment.city.keycli,
			clinic_name: appointment.city.clinica,
			clinic_address: appointment.city.address,
			date: "",
			hour: "",
			horaFin: "",
			keymed: "",
			gender: "",
			first_name: "",
			last_name: "",
			email: "",
			phone: "",
			message: "",
			type: appointment.type,
			utm_source,
			tmr, //Se incluirá al final
			comentarios: appointment.clientData.message,
			sexo: appointment.clientData.gender,
			error: `There are less than 5 available dates in ${appointment.city.clinica}`,
		};

		await sendErrorEmail(query_params);
	};

	///////////////////////////////////////////
	// RENDERIZADO DEL COMPONENTE
	///////////////////////////////////////////

	return (
		<React.Fragment>
			<Stepper currentStepIndex={properties.appointment?.currentStep} isVideoConference={false} />

			<div className="wrapper-general">
				<div className="top-content">
					<Button action={redirectToTypes} styleType={"back-button"} label={"Zurück"} />
				</div>
				<div className="calendar-online-appointment-page">
					<h1>Datum wählen</h1>
					<CardContainer isColumn={true}>
						<div className="button-container">
							{buttonsConfig.map((button, index) => {
								const customClass = appointment.type === button.type ? "card-highlighted" : "";
								return (
									<Card
										key={index}
										customClass={`pointer ${customClass}`}
										handleClick={handleClick}
										clickParam={button.type}
									>
										<label>
											<input
												checked={appointment.type === button.type}
												type="radio"
												name="type"
												value={button.type}
												onChange={() => {}}
											/>
											<img
												src={
													process.env.NODE_ENV === "development"
														? button.img
														: IMAGES_SERVER + button.img
												}
												alt="..."
											></img>
											{button.text} <strong>{button.label}</strong>
										</label>
									</Card>
								);
							})}
						</div>
					</CardContainer>
					{properties.loading.onlineGlobalLoading ||
					(appointment.type === "BIDI" && properties.loading.globalLoading) ? (
						<CardContainer>
							<div className="loading-center">
								<Loading />
							</div>
						</CardContainer>
					) : (
						<CardContainer className="change-margin">
							{!isLoading && (
								<Calendar
									datesList={dataCalendar}
									initialMonth={initialMonth}
									initialDate={initialDate}
									width={width}
									calendarWidth={calendarWidth}
									handleDateChange={handleDateChange}
									handleSelectedHour={handleSelectedHour}
									selectedDate={selectedDate}
									onNextMonthClick={onNextMonthClick}
									onPreviousMonthClick={onPreviousMonthClick}
									activeIndex={activeIndex}
								/>
							)}
						</CardContainer>
					)}
					<div className="container-button" ref={buttonRef}>
						{appointment.calendar_date && appointment.calendar_hour ? (
							<Button type={"rounded-button"} label={"TERMIN WÄHLEN"} action={onConfirmHour} />
						) : (
							<div className="button-fake-height"></div>
						)}
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		/**
		 * @param {String} property  Propiedad del estado que se debe actualizar
		 * @param {String || Object || number} data Datos con los que se actualizará la propiedad anterior
		 * @description Actualiza un campo del objeto de appointment
		 */

		setAppoinmentConfig: (property, data) => dispatch(setAppoinmentConfig(property, data)),

		/**
		 * @param {String} date Día presente en formato dd/mm/yyyy
		 * @returns {Object} Lista de citas online disponibles divididas por meses
		 */

		fetchOnlineAvailableHours: (date) => dispatch(fetchOnlineAvailableHours(date)),

		updateAvailableHours: (keycli, type, date, nextMonth) =>
			dispatch(updateAvailableHours(keycli, type, date, nextMonth)),
	};
};

/**
 *
 * @param {Object} store
 * @param {Object} store.appointment Configuración de la cita hasta el momento desde redux
 * @param {Object} store.available_hours Horas disponibles por tipo y ciudad desde redux
 * @description Transforma el appointments reducer a props
 * que serán consumidas por el componente y sus hijos.
 */

const mapStateToProps = ({ appointment, online_available_hours, available_hours, loading }) => ({
	appointment,
	online_available_hours,
	available_hours,
	loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarOnlinePage);
