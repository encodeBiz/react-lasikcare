import React, { useEffect, useState } from "react";

//Router

import { useHistory } from "react-router";

// Redux

import { connect } from "react-redux";
import { fetchAvailableHours } from "../../../redux/available_hours/available_hours.actions";
import { fetchClinics } from "../../../redux/clinics/clinics.actions";
import { setAppoinmentConfig } from "../../../redux/appointment_config/appointmentConfig.actions";

// Componentes

import CardContainer from "../../../shared_modules/CardContainer/CardContainer";
import Card from "../../../shared_modules/Card/Card";

// Assets

import madridIcon from "../../../assets/images/icons/one.jpg";
import albaceteIcon from "../../../assets/images/icons/dos.jpg";
import toledoIcon from "../../../assets/images/icons/tres.jpg";

//Estilos

import "./CityAppointmentPage.scss";


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
			icon: madridIcon,
		},
		{
			name: "Augsburg",
			icon: albaceteIcon,
		},
		{
			name: "Rosenheim",
			icon: toledoIcon,
		},
	];

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
			console.log(error);
		}
	};

	/**
	 * Setea el currentStep del store.
	 */
	useEffect(() => {
		if (properties.clinics.clinics?.length > 0) {
			const cities = JSON.parse(localStorage.getItem("cities"));
			if (cities) {
				getClinicsHours(cities);
			}

			properties.setAppoinmentConfig("currentStep", 0);
		}
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
	 *
	 * @param {String} keycli
	 * @param {String} name
	 * @param {String} address
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
			console.log(keycli, name, address)
			properties.setAppoinmentConfig("city", { keycli, name, address });
			history.push("/type");
			getClinicsHours([{ keycli, name }]);
		}
	};



	return (
		<div className="wrapper-general">
			<div className="title-seccion">
				<h1>Standort wählen</h1>
			</div>
			<div className="city-appointment-container">
				<CardContainer isColumn={true}>

					{/* Sin servidor */}

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


						{/*  Con servidor  */}


						{/* {cities.length > 0 &&
						cities.map((city, index) => {
							return (
								<Card key={index} handleClick={handleCitySelect} clickParam={city}>
									<img src={city.icon} alt={city.icon} className="type-image-city" />
									<p>{city.name}</p>
								</Card>
							);
						})}  */}


				</CardContainer>
			</div>
		</div>
	);
};

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
	 * @description Devuelve una lista de clínicas
	 */

	fetchClinics: () => dispatch(fetchClinics()),
});

const mapStateToProps = (state) => {
	return {
		clinics: state.clinics,
		appointment: state.appointment,
		available_hours: state.available_hours,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CityAppointmentPage);
