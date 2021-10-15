/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

//Router

import { useHistory } from "react-router";

// Redux

import { connect } from "react-redux";
import { updateAvailableHours } from "../../../redux/available_hours/available_hours.actions";
import { fetchClinics } from "../../../redux/clinics/clinics.actions";
import { setAppoinmentConfig } from "../../../redux/appointment_config/appointmentConfig.actions";
import { fetchOnlineAvailableHours } from "../../../redux/available_online_hours/available_online_hours.actions";

// Componentes

import CardContainer from "../../../shared_modules/CardContainer/CardContainer";
import Card from "../../../shared_modules/Card/Card";

// Assets

import madridIcon from "../../../assets/images/icons/one.jpg";
import albaceteIcon from "../../../assets/images/icons/dos.jpg";
import toledoIcon from "../../../assets/images/icons/tres.jpg";

//Estilos

import "./CityAppointmentPage.scss";
import { setGlobalError } from "../../../redux/errors/errors.actions";
import moment from "moment";
import { setIsGlobalLoading, setOnlineGlobalLoading } from "../../../redux/loading/loading.actions";
import Loading from "../../../shared_modules/Loading/Loading";
import { IMAGES_SERVER } from "../../../constants/constants";
import { setIsTimerActive } from "../../../redux/timer/timer.actions";

import Stepper from "../../../shared_modules/Stepper/Stepper";

/**
 * Seleccionde la ciudad, modifica el estado de configuracion de cita en el store
 * @param {Object} properties
 * @param {Promise} properties.clinics Clínicas disponibles
 */
const CityAppointmentPage = (properties) => {
	const history = useHistory();
	const [isLoading, setIsLoading] = useState(true);

	const currentMonthNum = moment().format("M");
	const currentMonth = moment().format("DD/MM/YYYY");

	const nextMonthNum = moment().set('date', 1).add(1, "month").format("M");
	const nextMonth = moment().set('date', 1).add(1, "month").format("DD/MM/YYYY");

	const nextSecondMonthNum = moment().set('date', 1).add(2, "month").format("M");
	const nextSecondMonth = moment().set('date', 1).add(2, "month").format("DD/MM/YYYY");

	const cities = [
		{
			name: "München",
			address: "SOME_ADDRESS1",
			keycli: "GR021",
			icon: madridIcon,
		},
		{
			name: "Augsburg",
			address: "SOME_ADDRESS2",
			keycli: "GR022",
			icon: albaceteIcon,
		},
		{
			name: "Rosenheim",
			address: "SOME_ADDRESS2",
			keycli: "GR023",
			icon: toledoIcon,
		},
	];

	///////////////////////////////////////////
	// LLAMADAS A APIS
	///////////////////////////////////////////

	useEffect(() => {
		properties.setAppoinmentConfig("currentStep", 0);
	}, []);

	/**
	 * ***************************************************************
	 * LISTA DE CLINICAS
	 * ***************************************************************
	 */

	/**
	 * Se ejecuta la función que se encarga de conseguir las clínicas
	 */

	useEffect(() => {
		if (properties.clinics.status !== "finish") {
			getClinics();
		} else {
			setIsLoading(false);
		}
		// eslint-disable-next-line
	},[]);

	/**
	 *  Se gestiona la llamada para conseguir la lista de clínicas
	 * 	Cuando se termina la llamada se setea el loading a false
	 */

	const getClinics = async () => {
		try {
			await properties.fetchClinics();
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			properties.setGlobalError(error);
		}
	};

	/**
	 * ***************************************************************
	 * HORAS LIBRES
	 * ***************************************************************
	 */

	/**
	 * Setea el currentStep del store y
	 * si existe el array cities en el local storage hace una llamada a la
	 * API para conseguir los datos de cada ciudad
	 */

	useEffect(() => {
		if (properties.timer.isTimerActive) {
			return;
		}

		if (properties.clinics.clinics?.length > 0) {
			// La llamada al timer tiene que hacerse aquí después de que
			// la llamada a getClinics modifique el Loading del que
			// depende este useEffect

			startTimer();
			//Descomentar si queremos habilitar las llamadas de cacheo
			/* const cities = JSON.parse(localStorage.getItem("tempCities"));
			
			if (cities) {
				getClinicsHours(cities);
			} */

			properties.setAppoinmentConfig("currentStep", 0);
		}
		if (isLoading) {
			//Esto es para habilitar la llamada a las en cahce de videochat
			getAllOnlineHours();
		}

		// eslint-disable-next-line
	}, [isLoading]);

	/**
	 * Activa el timer que impide que se realicen
	 * varias llamadas consecutivas
	 * en menos de un minuto
	 */

	const startTimer = () => {
		properties.setIsTimerActive(true);

		setTimeout(() => {
			properties.setIsTimerActive(false);
		}, 30000);
	};

	/**
	 * @param {Object} selectedCities
	 * Por cada uno de las clínicas se hace una llamada para conseguir
	 * los huecos tanto en "BI" (gratis) como en "BIDI" (de pago)
	 *
	 * IMPORTANTE!!
	 *
	 * Únicamente se harán las llamadas de las ciudades existentes en el localStorage
	 */

	const getClinicsHours = async (selectedCities) => {
		properties.setIsGlobalLoading(true);
		let firstMonthPromises = [];
		let secondPromises = [];
		try {
			selectedCities.forEach((clinic) => {
				firstMonthPromises.push(
					properties.updateAvailableHours(clinic.keycli, "BI", currentMonth, currentMonthNum),
					properties.updateAvailableHours(clinic.keycli, "BIDI", currentMonth, currentMonthNum)
				);
			});

			selectedCities.forEach((clinic) => {
				secondPromises.push(
					//Pedir los sigientes meses
					/*
					properties.updateAvailableHours(clinic.keycli, "BI", nextMonth, nextMonthNum),
					properties.updateAvailableHours(clinic.keycli, "BIDI", nextMonth, nextMonthNum),
				 	properties.updateAvailableHours(clinic.keycli, "BI", nextSecondMonth, nextSecondMonthNum),
					properties.updateAvailableHours(
						clinic.keycli,
						"BIDI",
						nextSecondMonth,
						nextSecondMonthNum
					)*/
				);
			});
			
			await Promise.all(firstMonthPromises.concat(secondPromises));
			properties.setIsGlobalLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	/**
	 * Hace una llamada a Redux para que consiga las fechas disponibles para las videollamadas
	 * Se hace una llamada por el mes presente y el siguiente para que estén disponibles
	 * @returns {{huecos: {Array.<keymed:String,fecha:String,horaRealCita:Number,horaInicio:Number,horaFin:Number>}, errores:{cod:Number,mensaje:Object}} }}
	 */

	const getAllOnlineHours = async () => {
		properties.setOnlineGlobalLoading(true);
		try {
			await properties.fetchOnlineAvailableHours(currentMonth);
			/* await properties.fetchOnlineAvailableHours(nextMonth);
			await properties.fetchOnlineAvailableHours(nextSecondMonth);
 */
			properties.setOnlineGlobalLoading(false);
		} catch (error) {
			properties.setOnlineGlobalLoading(false);
			console.log(error);
		}
	};

	//////////////////////////////////////////
	// GESTIÓN DE ESTADO Y STORAGE
	///////////////////////////////////////////

	/**
	 *
	 * @param {String} keycli
	 * @param {String} name
	 * @param {String} address
	 * @see setCityInStorage
	 *
	 * El usuario selecciona la ciudad en la que quiere la consulta,
	 * Se le redirige a la vista de selección de tipo de cita
	 * Si hay ciudades en el local storage se realiza una llamada para conseguir los huecos
	 * de las ciudades del local storage y de la selección del usuario.
	 * Si no, se limita a hacer una llamada por la ciudad seleccionada.
	 *
	 */
	const handleCitySelect = ({ keycli, clinica, address }) => {
		if(!clinica) clinica = 'münich';
		window.dataLayer.push({
			event: 'gaEvent',
			gaEventCategory: 'online booking',
			gaEventAction: 'step 1',
			gaEventLabel: 'standort',
			gaEventValue: undefined,
			gaEventNonInt: 0,
			dimension1: clinica.toLowerCase() // Clicked City name in lowercase
		});
		
		
		if (keycli) {
			// Setea la ciudad en el local storage
			//const cities = JSON.parse(localStorage.getItem("tempCities"));
			//let isCachedCity = false;
			//Descomentar si queremos habilitar las llamadas de cacheo
			/* if(cities){
				isCachedCity  = cities.find(city => city.keycli === keycli)
			} */

			//setCityInStorage({ keycli, clinica, address }); 

			// Setea la ciudad en redux

			properties.setAppoinmentConfig("city", { keycli, clinica, address });

			// Redirige hacia el siguiente paso

			history.push("/termintyp");

			// Hace la llamada a la API
			//Descomentar si queremos habilitar las llamadas de cacheo
			/* if(!isCachedCity || !properties.timer.isTimerActive){
				getClinicsHours([{ keycli, name: clinica }]);
			} */
			getClinicsHours([{ keycli, name: clinica }]);
		}
	};

	/**
	 *
	 * @param {Object} newCity
	 * @property {String} keycli
	 * @property {String} name
	 * @property {String} address
	 * @see handleCitySelect
	 *
	 * Pushea la nueva ciudad si no existe en el array del local storage.
	 * Si exite hace un early return
	 *
	 *
	 */

	const setCityInStorage = (newCity) => {
		const citiesInStorage = JSON.parse(localStorage.getItem("tempCities")) || [];
		const doesCityExist = citiesInStorage.some((city) => city.keycli === newCity.keycli);
		if (!doesCityExist) {
			citiesInStorage.push(newCity);
			localStorage.setItem("tempCities", JSON.stringify(citiesInStorage));
		} else {
			return;
		}
	};

	const navigateTo = (url) => history.push(url);

	//////////////////////////////////////////
	// RENDERIZADO
	///////////////////////////////////////////

	return (
		<>
			<Stepper currentStepIndex={properties.appointment?.currentStep} navigateTo={navigateTo} />
			<div className="wrapper-general">
				<div className="title-seccion">
					<h1>Bitte Standort wählen</h1>
				</div>
				<span onClick={() => history.push("/termin-bereits-vergeben")} className="sorry-link">
					To sorry page
				</span>

				<div className="city-appointment-container">
					{isLoading ? (
						<CardContainer>
							<div className="loading-center">
								<Loading />
							</div>
						</CardContainer>
					) : (
						<CardContainer isColumn={true}>
							{properties.clinics.clinics?.length > 0 &&
								properties.clinics.clinics.map((city, index) => {
									const cityIcon = cities.find(
										(cityWithIcon) => cityWithIcon.keycli === city.keycli
									);
									return (
										<Card key={index} handleClick={handleCitySelect} clickParam={city}>
											<img
												src={
													process.env.NODE_ENV === "development"
														? cityIcon?.icon
														: IMAGES_SERVER + cityIcon?.icon
												}
												alt={cityIcon?.icon}
												className="type-image-city"
											/>
											<p>{city.clinica}</p>
										</Card>
									);
								})}
						</CardContainer>
					)}
				</div>
			</div>
		</>
	);
};

//////////////////////////////////////////
// REDUX
//////////////////////////////////////////

const mapDispatchToProps = (dispatch) => ({
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
	 * @returns
	 */

	fetchOnlineAvailableHours: (date) => dispatch(fetchOnlineAvailableHours(date)),

	/**
	 *
	 * @param {String} keycli
	 * @param {String} type
	 * @param {String} date
	 * @param {String} nextMonth
	 * @returns
	 */

	updateAvailableHours: (keycli, type, date, nextMonth) =>
		dispatch(updateAvailableHours(keycli, type, date, nextMonth)),

	/**
	 * @description Devuelve una lista de clínicas
	 */

	fetchClinics: () => dispatch(fetchClinics()),

	/**
	 *
	 * @param {String} error
	 *
	 * Setea un nuevo error en Redux
	 */

	setGlobalError: (error) => dispatch(setGlobalError(error)),

	/**
	 *
	 * @param {boolean} value
	 * @returns
	 */

	setIsGlobalLoading: (value) => dispatch(setIsGlobalLoading(value)),

	/**
	 *
	 * @param {boolean} onlineValue
	 * @returns
	 */

	setOnlineGlobalLoading: (onlineValue) => dispatch(setOnlineGlobalLoading(onlineValue)),

	setIsTimerActive: (value) => dispatch(setIsTimerActive(value)),
});

const mapStateToProps = (state) => {
	return {
		clinics: state.clinics,
		appointment: state.appointment,
		available_hours: state.available_hours,
		online_available_hours: state.online_available_hours,
		loading: state.loading,
		timer: state.isTimerActive,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CityAppointmentPage);
