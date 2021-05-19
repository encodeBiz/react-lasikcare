import React, { useEffect, useState } from "react";

//Router

import { useHistory } from "react-router";

// Redux

import { connect } from "react-redux";
import { fetchAvailableHours } from "../../../redux/available_hours/available_hours.actions";
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

/**
 * Seleccionde la ciudad, modifica el estado de configuracion de cita en el store
 * @param {Object} properties
 * @param {Promise} properties.clinics Clínicas disponibles
 */
const CityAppointmentPage = (properties) => {
	const history = useHistory();
	const [isLoading, setIsLoading] = useState(true);

	const cities = [
		{
			name: "München",
			address: "SOME_ADDRESS1",
			keycli: "CITY1",
			icon: madridIcon,
		},
		{
			name: "Augsburg",
			address: "SOME_ADDRESS2",
			keycli: "CITY2",
			icon: albaceteIcon,
		},
		{
			name: "Rosenheim",
			address: "SOME_ADDRESS2",
			keycli: "CITY2",
			icon: toledoIcon,
		},
	];

	///////////////////////////////////////////
	// LLAMADAS A APIS
	///////////////////////////////////////////

	/**
	 * ***************************************************************
	 * LISTA DE CLINICAS
	 * ***************************************************************
	 */

	/**
	 * Se ejecuta la función que se encarga de conseguir las clínicas
	 */

	useEffect(() => {
		getClinics();
		// eslint-disable-next-line
	}, []);

	/**
	 *  Se gestiona la llamada para conseguir la lista de clínicas
	 * 	Cuando se termina la llamada se setea el loading a false
	 */

	const getClinics = async () => {
		try {
			await properties.fetchClinics();
			setIsLoading(false);
		} catch (error) {
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
		if (properties.clinics.clinics?.length > 0) {
			const cities = JSON.parse(localStorage.getItem("tempCities"));
			if (cities) {
				getClinicsHours(cities);
			}

			properties.setAppoinmentConfig("currentStep", 0);
		}
		getAllOnlineHours();
		// eslint-disable-next-line
	}, [isLoading]);

	/**
	 * @param {Object} selectedCities
	 * Por cada uno de las clínicas se hace una llamada para conseguir
	 * los huecos tanto en "BI" (gratis) como en "BIDI" (de pago)
	 */

	const getClinicsHours = (selectedCities) => {
		selectedCities.forEach((clinic) => {
			properties.fetchAvailableHours(clinic.keycli, "BI");
			properties.fetchAvailableHours(clinic.keycli, "BIDI");
		});
	};

	/**
	 * Hace una llamada a Redux para que consiga las fechas disponibles para las videollamadas
	 * Se hace una llamada por el mes presente y el siguiente para que estén disponibles 
	 * @returns {{huecos: {Array.<keymed:String,fecha:String,horaRealCita:Number,horaInicio:Number,horaFin:Number>}, errores:{cod:Number,mensaje:Object}} }}
	 */

	const getAllOnlineHours = async () => {
		const date = getTodayDate();
		const nextMonthDate = getNextMonthDate(); 

		await properties.fetchOnlineAvailableHours(date);
		await properties.fetchOnlineAvailableHours(nextMonthDate);

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
	const handleCitySelect = ({ keycli, name, address }) => {
		if (keycli) {
			// Setea la ciudad en el local storage

			setCityInStorage({ keycli, name, address });

			// Setea la ciudad en redux

			properties.setAppoinmentConfig("city", { keycli, name, address });

			// Redirige hacia el siguiente paso

			history.push("/type");

			// Hace la llamada a la API

			getClinicsHours([{ keycli, name }]);
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

	//////////////////////////////////////////
	// HELPERS
	///////////////////////////////////////////

	const getTodayDate = () => moment().format("DD/MM/yyyy");

	const getNextMonthDate = () => moment().add(1, "month").format("DD/MM/yyyy")

	//////////////////////////////////////////
	// RENDERIZADO
	///////////////////////////////////////////


	return (
		<div className="wrapper-general">
			<div className="title-seccion">
				<h1>Bitte Standort wählen</h1>
			</div>
			<div className="city-appointment-container">
				<CardContainer isColumn={true}>
					{properties.clinics.clinics?.length > 0 &&
						properties.clinics.clinics.map((city, index) => {
							const cityIcon = cities.find((cityWithIcon) => cityWithIcon.name === city.name);
							return (
								<Card key={index} handleClick={handleCitySelect} clickParam={city}>
									<img src={cityIcon?.icon} alt={cityIcon?.icon} className="type-image-city" />
									<p>{city.name}</p>
								</Card>
							);
						})}
				</CardContainer>
			</div>
		</div>
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
	 * @param {String} keycli Código de la ciudad
	 * @param {('BI' | 'BIDI')} appointments_type Tipo de cita BI = Gratis | BIDI = Pago
	 */
	fetchAvailableHours: (keycli, appointments_type) =>
		dispatch(fetchAvailableHours(keycli, appointments_type)),

	/**
	 *
	 * @param {String} date Día presente en formato dd/mm/yyyy
	 * @returns
	 */

	fetchOnlineAvailableHours: (date) => dispatch(fetchOnlineAvailableHours(date)),

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
});

const mapStateToProps = (state) => {
	return {
		clinics: state.clinics,
		appointment: state.appointment,
		available_hours: state.available_hours,
		online_available_hours: state.online_available_hours,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CityAppointmentPage);
