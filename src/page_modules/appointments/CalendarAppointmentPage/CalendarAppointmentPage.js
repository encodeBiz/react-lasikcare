import React, { useEffect, useState } from "react";
import Stepper from "../../../shared_modules/Stepper/Stepper";
import StepTitle from "../../../shared_modules/StepTitle/StepTitle";
import Calendar from "../../../shared_modules/Calendar/Calendar";


import "./CalendarAppointmentPage.scss";
import Button from "../../../shared_modules/Button/Button";
import { useHistory } from "react-router";
import { setAppoinmentConfig } from "../../../redux/appointment_config/appointmentConfig.actions";
import { connect } from "react-redux";
import moment from "moment";
import useWindowSize from "../../../hooks/useWindowSize";


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
	const [selectedType, setType] = useState(null)
	const [selectedCity, setCity] = useState(null)
	const [dataCalendar, setDataCalendar] = useState([])

	

	/**
	* @description Setea el currentStep del store
	*/
	useEffect(() => {
		properties.available_hours
			.then((available_hours)=>{
				properties.setAppoinmentConfig("currentStep", 2);
				setType(properties.appointment.type)
				setCity(properties.appointment.city.keycli)

				return available_hours
			})
			.then((available_hours) => {
				/**
				 * @type {Array.<String>}
				 */
				const data = selectedCity && selectedType ? available_hours[selectedCity].data[selectedType].hueco : []
				
				setDataCalendar(
					data.map(item =>{
						const date =  item.fecha.split('/')
						const formatedDate = new Date( parseInt(date[2]) , parseInt(date[1]) - 1, parseInt(date[0]) )
				  	return {...item, formatedDate : moment(formatedDate)}	
					})
				)
		})
	}, [selectedType,selectedCity]);


	/**
	* @description Setea la anchura del calendario 
	* para adaptarlo a diferentes tamaños de pantalla. 
	*/
	useEffect(() => {
		setCalendarWidth(formatCalendarWidth(width))
	}, [width])

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

	const formatDateToString = (date) => {
		return moment(date).format("DD/MM/yyyy").split("/").join("");
	  };



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
				<Button 
					action={history.goBack} 
					type={"back-button"} 
					label={"Zurück"} />
			</div>
			<StepTitle></StepTitle>
			<Calendar 
				datesList={dataCalendar} 
				setFocused={setFocused} 
				initialDate={initialDate} 
				width={width} 
			>
			</Calendar>
			<Button 
				type={"rounded-button"} 
				label={"Rounded button"} ç
			/>
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
 * @param {Object} store.appointment Configuración de la cita hasta el momento desde redux
 * @param {Object} store.available_hours Horas disponibles por tipo y ciudad desde redux
 * @description Transforma el appointments reducer a props
 * que serán consumidas por el componente y sus hijos.
 */

const mapStateToProps = (store) => {
	return {
		appointment: store.appointment,
		available_hours : store.available_hours 
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarAppointmentPage);
