/* eslint-disable react-hooks/exhaustive-deps */
import "./CalendarOnlinePage.scss";
import { connect } from "react-redux";
import { setAppoinmentConfig } from "../../../redux/appointment_config/appointmentConfig.actions";
import { useHistory } from "react-router";
import Button from "../../../shared_modules/Button/Button";
import Calendar from "../../../shared_modules/Calendar/Calendar";
import Card from "../../../shared_modules/Card/Card";
import CardContainer from "../../../shared_modules/CardContainer/CardContainer";
import moment from "moment";
import opcionOne from "../../../assets/images/icons/icon-videocall.svg";
import opcionTwo from "../../../assets/images/icons/calendar-icon.svg";
import React, { useEffect, useState } from "react";
import Stepper from "../../../shared_modules/Stepper/Stepper";
import useWindowSize from "../../../hooks/useWindowSize";

const CalendarOnlinePage = (properties) => {
	const buttonsConfig = [
		{
			action: "Video-beratung",
			text: "Video-beratung",
			label: "",
			type: "BI",
			img: opcionOne,
		},
		{
			action: "Voruntersuchung",
			text: "Voruntersuchung",
			label: "40€",
			type: "BIDI",
			img: opcionTwo,
		},
	];

	const goBack = useHistory().goBack;
	const history = useHistory();
	const today = moment();
	const { width } = useWindowSize();
	const [calendarWidth, setCalendarWidth] = useState(null);
	const [focused, setFocused] = useState(false);
	const [activeIndex, setActiveIndex] = useState(null);
	const [initialDate] = useState(today);
	const [loading, setLoading] = useState(false);
	const [selectedType, setType] = useState(null);
	const [selectedCity, setCity] = useState(null);
	const [dataCalendar, setDataCalendar] = useState([]);
	const [selectedDate, setSelectedDate] = useState(null);
	const currentMonthNumber = moment(today, "DD/MM/YYYY").format("M");
	const [currentMonth, setCurrentMonth] = useState(currentMonthNumber);


	const { appointment, available_hours, } = properties;

	/**
	 * Seteo del current step, de la ciudad y el tipo de consulta seleccionada
	 */

	useEffect(() => {
		properties.setAppoinmentConfig("currentStep", 1);
		setType(properties.appointment.type);
		setCity(properties.appointment.city.keycli);
	}, [selectedType]);

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

	/////////////////////////////
	// Gestión de eventos
	/////////////////////////////

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
	 * @param {Date} currentDate
	 * Cuando se pulsa en el botón de siguiente mes del calendario se hace una
	 * llamada para conseguir los huecos del mes siguiente
	 *
	 */

	const onNextMonthClick = async (currentDate) => {
		try {
			// Setea currentMonth al mes actual

			const month = moment(today, "DD/MM/YYYY").format("M");

			setCurrentMonth(month);

			// Se setea la fecha seleccionada a null para que desaparezcan las horas seleccionadas
			setSelectedDate(null);

			// Setea la fecha del que se pasará al action. Se añade un mes exacto

			const date = moment(currentDate).add(1, "month").format("DD/M/YYYY");

			// Setea el mes que se utilizará para ubicar los nuevos datos en su lugar en el state

			const nextMonth = (Number(currentMonth) + 2).toString();

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

	return (
		<React.Fragment>
			<Stepper currentStepIndex={appointment?.currentStep} isVideoConference={true}></Stepper>
			<div className="wrapper-general">
				<div className="top-content">
					<Button action={goBack} styleType={"back-button"} label={"Zurück"} />
				</div>

				<div className="calendar-online-page">
					<h1>2. Datum wählen</h1>
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
											<img src={button.img} alt="..."></img>
											{button.text} <strong>{button.label}</strong>
										</label>
									</Card>
								);
							})}
						</div>
					</CardContainer>
				</div>

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
				{appointment.calendar_date && appointment.calendar_hour && (
					<div className="container-button">
						<Button type={"rounded-button"} label={"TERMIN WÄHLEN"} action={onConfirmHour} />
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

const mapStateToProps = ({ appointment, available_hours }) => ({
	appointment,
	available_hours,
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarOnlinePage);
