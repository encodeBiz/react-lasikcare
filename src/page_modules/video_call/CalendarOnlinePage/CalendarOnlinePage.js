/* eslint-disable react-hooks/exhaustive-deps */
import "./CalendarOnlinePage.scss";
import { connect } from "react-redux";
import { setAppoinmentConfig } from "../../../redux/appointment_config/appointmentConfig.actions";
import { useHistory } from "react-router";
import Button from "../../../shared_modules/Button/Button";
import Calendar from "../../../shared_modules/Calendar/Calendar";
import CardContainer from "../../../shared_modules/CardContainer/CardContainer";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Stepper from "../../../shared_modules/Stepper/Stepper";
import useWindowSize from "../../../hooks/useWindowSize";
import { fetchOnlineAvailableHours } from "../../../redux/available_online_hours/available_online_hours.actions";
import Loading from "../../../shared_modules/Loading/Loading";

const CalendarOnlinePage = (properties) => {
	const goBack = useHistory().goBack;
	const history = useHistory();
	const today = moment();
	const { width } = useWindowSize();
	const [calendarWidth, setCalendarWidth] = useState(null);
	const [focused, setFocused] = useState(false);
	const [activeIndex, setActiveIndex] = useState(null);
	const [initialDate] = useState(today);
	const [loading, setLoading] = useState(false);
	const [dataCalendar, setDataCalendar] = useState([]);
	const [selectedDate, setSelectedDate] = useState(null);
	const currentMonthNumber = moment(today, "DD/MM/YYYY").format("M");
	const [currentMonth, setCurrentMonth] = useState(currentMonthNumber);

	const { appointment, online_available_hours } = properties;

	///////////////////////////////////////////
	// CONFIGURACIÓN DEL COMPONENTE
	///////////////////////////////////////////

	/**
	 * Seteo del current step, de la ciudad y el tipo de consulta seleccionada
	 */

	useEffect(() => {
		properties.setAppoinmentConfig("currentStep", 0);
		setCurrentMonth(moment(today, "DD/MM/YYYY").format("M"));
	}, []);

	/**
	 * @description Gestiona la llegada de datos procedentes de Redux store
	 */

	useEffect(() => {
		const data = online_available_hours[currentMonth.toString()]
			? online_available_hours[currentMonth.toString()]
			: undefined;

		if (data && data.length > 0) {
			const formattedDates = formatDates(data);
			setDataCalendar(formattedDates);
		} else {
			setDataCalendar([]);
		}
	}, [currentMonth, online_available_hours]);

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
		if (width <= 320) return 35;
		else if (width <= 414 || width <= 1080) return 40;
		else if (width <= 980) return 50;
		else return 50;
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
			// Setea currentMonth al mes actual

			// const month = moment(today, "DD/MM/YYYY").add(1, "month").format("M");

			setCurrentMonth(Number(currentMonth) + 1);

			// Se setea la fecha seleccionada a null para que desaparezcan las horas seleccionadas
			setSelectedDate(null);

			// Setea la fecha del que se pasará al action. Se añade un mes exacto

			console.log(currentMonth, online_available_hours)

			const date = moment(currentDate).add(2, "month").format("DD/M/YYYY");

			await properties.fetchOnlineAvailableHours(date);
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

	const onConfirmHour = () => history.push("/videollamadas/confirm");

	///////////////////////////////////////////
	// RENDERIZADO DEL COMPONENTE
	///////////////////////////////////////////

	return (
		<React.Fragment>
			<Stepper currentStepIndex={appointment?.currentStep} isVideoConference={true}></Stepper>
			<div className="wrapper-general">
				<div className="top-content">
					<Button action={goBack} styleType={"back-button"} label={"Zurück"} />
				</div>
				<div className="calendar-appoinment-page">
					<h1>1. Datum wählen</h1>
					{properties.loading.onlineGlobalLoading ? (
						<CardContainer>
							<div className="loading-center">
								<Loading />
							</div>
						</CardContainer>
					) : (
						<CardContainer>
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
								></Calendar>
							)}
						</CardContainer>
					)}
					{appointment.calendar_date && appointment.calendar_hour && (
						<div className="container-button">
							<Button type={"rounded-button"} label={"TERMIN WÄHLEN"} action={onConfirmHour} />
						</div>
					)}
				</div>
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
		 *
		 * @param {String} date Día presente en formato dd/mm/yyyy
		 * @returns {Object} Lista de citas online disponibles divididas por meses
		 */

		fetchOnlineAvailableHours: (date) => dispatch(fetchOnlineAvailableHours(date)),
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

const mapStateToProps = ({ appointment, online_available_hours, loading }) => ({
	appointment,
	online_available_hours,
	loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarOnlinePage);
