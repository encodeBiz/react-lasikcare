import React, { useEffect, useState } from "react";
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
	const { available_hours } = properties;

	/////////////////////////////
	// Configuración del componente
	/////////////////////////////

	// const [dataTimes, setDataTimes] = useState([]);
	// const [dataDates, setDataDates] = useState(null);
	// const [chosenAppointment, setChosenAppointment] = useState({});
	// const [selectedDateString, setSelectedDateString] = useState(null);
	const [calendarWidth, setCalendarWidth] = useState(null);
	const [focused, setFocused] = useState(false);
	const [initialDate, setInitialDate] = useState(today);
	const { width } = useWindowSize();
	const [selectedType, setType] = useState(null);
	const [selectedCity, setCity] = useState(null);
	const [dataCalendar, setDataCalendar] = useState([]);
	const [selectedDate, setDate] = useState(null);

	/**
	 * Seteo del current step y de la ciudad y el tipo de consulta seleccionada
	 */

	useEffect(() => {
		properties.setAppoinmentConfig("currentStep", 2);
		setType(properties.appointment.type);
		setCity(properties.appointment.city.keycli);
		// eslint-disable-next-line
	}, []);

	/**
	 * @description Setea el currentStep del store
	 */
	useEffect(() => {
		const data =
			selectedCity && selectedType
				? properties.available_hours[selectedCity].data[selectedType]
				: [];

		const filteredData = data?.map((item) => {
			const date = item.fecha.split("/");
			const formattedDate = new Date(parseInt(date[2]), parseInt(date[1]) - 1, parseInt(date[0]));
			return { ...item, formattedDate: moment(formattedDate) };
		});
		setDataCalendar(filteredData);
		// eslint-disable-next-line
	}, [available_hours, selectedType, selectedCity]);

	/**
	 * @description Setea la anchura del calendario
	 * para adaptarlo a diferentes tamaños de pantalla.
	 */
	useEffect(() => {
		setCalendarWidth(formatCalendarWidth(width));
	}, [width]);

	const formatCalendarWidth = (width) => {
		//a partir de 1080 no debe ejecutarse la función
		if (width <= 320) return 35;
		else if (width <= 414 || width <= 1080) return 40;
		else if (width <= 980) return 50;
		else return 50;
	};

	/////////////////////////////
	// Gestión de eventos
	/////////////////////////////

	const handleDateChange = (date) => {
		const finded = dataCalendar.filter((item) => {
			return item.formattedDate.format("DD-MM-yyyy") === date.format("DD-MM-yyyy");
		});
		setDate(finded);
		console.log(date);
		properties.setAppoinmentConfig("calendar_date", date);
	};

	const handleSelectedHour = (hour) => properties.setAppoinmentConfig("calendar_hour", hour);


	
	/////////////////////////////
	// Renderizado del componente
	/////////////////////////////

	return (
		<div className="wrapper-general">
			<Stepper
				currentStepIndex={properties.appointment?.currentStep}
				navigateTo={navigateTo}
			></Stepper>
			<div className="top-content">
				<Button action={history.goBack} styleType={"back-button"} label={"Zurück"} />
			</div>

			<div class="calendar-appointment-page">
			<h1>3. Datum wählen</h1>

			<CardContainer>
			<Calendar 
				datesList={dataCalendar} 
				setFocused={setFocused} 
				initialDate={initialDate} 
				width={width} 
				calendarWidth={calendarWidth}
			>
			</Calendar>
			</CardContainer>
			<div class="container-button">
			<Button 
				type={"rounded-button"} 
				label={"TERMIN WÄHLEN"} ç
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
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarAppointmentPage);
