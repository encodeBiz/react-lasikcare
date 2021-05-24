import React, { useEffect, useRef, useState } from "react";
import Stepper from "../../../shared_modules/Stepper/Stepper";
import Calendar from "../../../shared_modules/Calendar/Calendar";

import "./CalendarAppointmentPage.scss";
import Button from "../../../shared_modules/Button/Button";
import { useHistory } from "react-router";
import { setAppoinmentConfig } from "../../../redux/appointment_config/appointmentConfig.actions";
import { connect } from "react-redux";
import moment from "moment";
import useWindowSize from "../../../hooks/useWindowSize";
import CardContainer from "../../../shared_modules/CardContainer/CardContainer";
import { updateAvailableHours } from "../../../redux/available_hours/available_hours.actions";
import Card from "../../../shared_modules/Card/Card";
import opcionOne from "../../../assets/images/icons/type-free.svg";
import opcionTwo from "../../../assets/images/icons/calendar-icon.svg";
import Loading from "../../../shared_modules/Loading/Loading";
import { IMAGES_SERVER } from "../../../constants/constants";

/**
 *
 * @param {Object} properties
 * @param {Object} properties.appointment Configuración de la cita hasta el momento desde redux
 * @param {Object} properties.available_hours Horas disponibles por tipo y ciudad desde redux
 *
 * Pagina de calendario y selección de hora
 */

const CalendarAppointmentPage = (properties) => {
	const history = useHistory();
	const navigateTo = (url) => history.push(url);
	const today = moment();
	const { available_hours, appointment } = properties;

	const buttonRef = useRef(null);

	const buttonsConfig = [
		{
			action: "Voruntersuchung",
			text: "Voruntersuchung",
			label: "40€",
			type: "BIDI",
			img: opcionTwo,
		},
		{
			action: "Erstberatung",
			text: "Erstberatung",
			label: "",
			type: "BI",
			img: opcionOne,
		},
	];

	/////////////////////////////
	// Configuración del componente
	/////////////////////////////

	const [calendarWidth, setCalendarWidth] = useState(null);
	// eslint-disable-next-line
	const [focused, setFocused] = useState(false);
	const [initialDate] = useState(today);
	const { width } = useWindowSize();
	const [selectedType, setType] = useState(null);
	const [selectedCity, setCity] = useState(null);
	const [dataCalendar, setDataCalendar] = useState([]);
	const [selectedDate, setSelectedDate] = useState(null);
	const [loading, setLoading] = useState(false);
	const [activeIndex, setActiveIndex] = useState(null);

	const currentMonthNumber = moment(today, "DD/MM/YYYY").format("M");

	const [currentMonth, setCurrentMonth] = useState(currentMonthNumber);

	/**
	 * Seteo del current step y de la ciudad y el tipo de consulta seleccionada
	 */

	useEffect(() => {
		properties.setAppoinmentConfig("currentStep", 2);
		setType(properties.appointment.type);
		setCity(properties.appointment.city.keycli);
		// eslint-disable-next-line
	}, [selectedType]);

	/**
	 * @description Setea el currentStep del store
	 * @see filterData
	 */
	useEffect(() => {
		// Selecciona del store los datos correspondientes al mes que se muestra en el calendario

		const data =
			selectedCity && selectedType
				? properties.available_hours[selectedCity]?.data[selectedType]?.[currentMonth]
				: [];

		if (data && data.length > 0) {
			const filteredData = filterData(data);

			setDataCalendar(filteredData);
		}
		// eslint-disable-next-line
	}, [selectedType, selectedCity, currentMonth, properties.loading.isGlobalLoading]);

	/**
	 * @description Setea la anchura del calendario
	 * para adaptarlo a diferentes tamaños de pantalla.
	 */

	useEffect(() => {
		setCalendarWidth(formatCalendarWidth(width));
	}, [width]);

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

	/////////////////////////////
	// Gestión de eventos
	/////////////////////////////

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

		const finded = dataCalendar?.filter((item) => {
			return item.formattedDate.format("DD-MM-yyyy") === date.format("DD-MM-yyyy");
		});

		setSelectedDate(finded);
		properties.setAppoinmentConfig("calendar_date", date);
	};

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

			if (properties.loading.isGlobalLoading) {
				return;
			}

			// Se setea la fecha seleccionada a null para que desaparezcan las horas seleccionadas

			setSelectedDate(null);

			// Setea la fecha del que se pasará al action. Se añade un mes exacto

			const date = moment(currentDate).add(1, "month").format("DD/M/YYYY");

			// Setea el mes que se utilizará para ubicar los nuevos datos en su lugar en el state
			// Como ya se tienen los 3 primeros meses incluyendo el presente se setea el siguiente
			// mes a presente mes + 3

			const nextMonth = (Number(currentMonth) + 3).toString();

			// Se suma uno al mes actual

			setCurrentMonth((Number(currentMonth) + 1).toString());

			// Acción que llama a la API para conseguir los datos del mes siguiente

			await properties.updateAvailableHours(
				appointment.city.keycli,
				appointment.type,
				date,
				nextMonth
			);
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

	const filterData = (data) => {
		if (data && data.length > 0) {
			const filteredData = data.map((item) => {
				const date = item.fecha.split("/");
				const formattedDate = new Date(parseInt(date[2]), parseInt(date[1]) - 1, parseInt(date[0]));
				return { ...item, formattedDate: moment(formattedDate) };
			});

			return filteredData;
		}
	};

	/**
	 * Una vez se ha seleccionado la fecha y la hora se activa esta función en el click del botón
	 */

	const onConfirmHour = () => history.push("/appointments/confirm");

	/**
	 *
	 * @param {String} type Tipo de cita seleccionado
	 */

	const handleClick = async (type) => {
		try {
			// Se setea el loading a true ya que al cargar nuevos datos es posible que de un undefined.

			setLoading(true);

			// Setea el tipo

			setType(type);

			// Setea el currentMonth al mes actual ya que se recarga el calendario

			setCurrentMonth(moment(today, "DD/MM/YYYY").format("M"));

			// Se cambia el tipo de cita en el estado

			await properties.setAppoinmentConfig("type", type);

			// Se seleccionan desde el estado las fechas correspondientes al nuevo tipo de cita

			const selectedHours = await available_hours[selectedCity].data[selectedType][currentMonth];

			// Se formatean las horas seleccioonadas

			const filteredData = filterData(selectedHours);

			// Se setean los datos formateados como nuevos datos que el calendario debera pintar

			setDataCalendar(filteredData);

			// Para que no se pinten horas que no corresponden a ninguna de las fechas seleccionadas se limpia el estado de fecha seleccionada

			setSelectedDate(null);

			// Se setea el loading a false

			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	/**
	 * Scroll cuando se selecciona una nueva hora
	 */

	const handleScroll = () => {
		if (buttonRef) {
			buttonRef.current.scrollIntoView({ behavior: "smooth" });
		}
	};

	/////////////////////////////
	// Renderizado del componente
	/////////////////////////////

	return (
		<React.Fragment>
			<Stepper currentStepIndex={properties.appointment?.currentStep} navigateTo={navigateTo} />

			<div className="wrapper-general">
				<div className="top-content">
					<Button action={history.goBack} styleType={"back-button"} label={"Zurück"} />
				</div>
				<div className="calendar-appointment-page">
					<h1>3. Datum wählen</h1>
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
					{properties.loading.isGlobalLoading ? (
						<CardContainer>
							<div className="loading-center">
								<Loading />
							</div>
						</CardContainer>
					) : (
						<CardContainer className="change-margin">
							{!loading && (
								<Calendar
									datesList={dataCalendar}
									setFocused={setFocused}
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

const mapStateToProps = (store) => {
	return {
		appointment: store.appointment,
		available_hours: store.available_hours,
		loading: store.loading,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarAppointmentPage);
