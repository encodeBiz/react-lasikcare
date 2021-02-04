import React, { useEffect, useState } from "react";
import Stepper from "../../../shared_modules/Stepper/Stepper";
import StepTitle from "../../../shared_modules/StepTitle/StepTitle";
import Calendar from "../../../shared_modules/Calendar/Calendar";
import CalendarHour from "../../../shared_modules/Calendar/CalendarHour/CalendarHour";

import "./CalendarAppointmentPage.scss";
import Button from "../../../shared_modules/Button/Button";
import { useHistory } from "react-router";
import { setAppoinmentConfig } from "../../../redux/appointment_config/appointmentConfig.actions";
import { connect } from "react-redux";
import moment from "moment";
import useWindowSize from "../../../hooks/useWindowSize";

const CalendarAppointmentPage = (properties) => {
	const history = useHistory();
	const navigateTo = (url) => history.push(url);
	const today = moment();

	/////////////////////////////
	// Configuración del componente
	/////////////////////////////

	const [dataTimes, setDataTimes] = useState([]);
	const [dataDates, setDataDates] = useState(null);
	const [chosenAppointment, setChosenAppointment] = useState({});
	const [selectedDateString, setSelectedDateString] = useState(null);
	const [calendarWidth, setCalendarWidth] = useState(null);
	const [focused, setFocused] = useState(false);
	const [initialDate, setInitialDate] = useState(today);
	const [datesToString, setDatesToString] = useState("");
	const {width} = useWindowSize()


	const formatCalendarWidth = (width) => {
		//a partir de 1080 no debe ejecutarse la función
		if (width <= 320) return 35;
		else if (width <= 414 || width <= 1080) return 40;
		else if (width <= 980) return 50;
		else return 50;
	  };
	



	/**
	 * @description Setea el currentStep del store
	 */

	useEffect(() => {
		properties.setAppoinmentConfig("currentStep", 2);
		// eslint-disable-next-line
	}, []);

	/**
	 * @description Setea la anchura del calendario 
	 * para adaptarlo a diferentes tamaños de pantalla. 
	 */

	useEffect(() => {
		setCalendarWidth(formatCalendarWidth(width))
	}, [width])

	/////////////////////////////
	// Gestión de eventos
	/////////////////////////////

	const formatDateToString = (date) => {
		return moment(date).format("DD/MM/yyyy").split("/").join("");
	  };


	const handleDateChange = (date) => {
		setSelectedDateString(null)
		const selectedDateString = formatDateToString(date)
		if(datesToString.includes(selectedDateString)){
			setSelectedDateString(setSelectedDateString)
		}
	}


	/////////////////////////////
	// Renderizado del componente
	/////////////////////////////


	return (
		<React.Fragment>
			<Stepper
				currentStepIndex={properties.appointment?.currentStep}
				navigateTo={navigateTo}
			></Stepper>
			<div className="top-content">
				<Button action={history.goBack} type={"back-button"} label={"Zurück"} />
			</div>
			<StepTitle></StepTitle>
			<Calendar setFocused={setFocused} initialDate={initialDate} width={width} handleDateChange={handleDateChange}>
				<CalendarHour></CalendarHour>
			</Calendar>
			<Button type={"rounded-button"} label={"Rounded button"} />
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

export default connect(mapStateToProps, mapDispatchToProps)(CalendarAppointmentPage);
