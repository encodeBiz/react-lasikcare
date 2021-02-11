import React, { useEffect, useState } from "react";
import CardContainer from "../../../shared_modules/CardContainer/CardContainer";
import Stepper from "../../../shared_modules/Stepper/Stepper";
import "./CityAppointmentPage.scss";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import Button from "../../../shared_modules/Button/Button";
import { componentDidUpdate } from "../../../redux/redux.helper";

import { setAppoinmentConfig } from "../../../redux/appointment_config/appointmentConfig.actions";
import SelectComponent from "../../../shared_modules/Select/Select.component";
import madridIcon from "../../../assets/images/icons/one.jpg";
import albaceteIcon from "../../../assets/images/icons/dos.jpg";
import toledoIcon from "../../../assets/images/icons/tres.jpg";
import Card from "../../../shared_modules/Card/Card";
import { setClinicAppointments } from "../../../redux/clinics/clinics.actions";
import { fetchAvailableHours } from "../../../redux/available_hours/available_hours.actions";

/**
 * Seleccionde la ciudad, modifica el estado de configuracion de cita en el store
 * @param {Object} properties
 * @param {Promise} properties.clinics Clínicas disponibles
 */
const CityAppointmentPage = (properties) => {
	const history = useHistory();
	const [clinics, setClinics] = useState([]);
	const [selectedClinic, selectClinic] = useState(null);
	const [clientCity, setClientCity] = useState(null);

	const goBack = useHistory().goBack;

	const cities = [
		{
			name: "Münich",
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
	 * Setea el currentStep del store.
	 */
	useEffect(() => {
		properties.setAppoinmentConfig("currentStep", 1);
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		

		const city = localStorage.getItem('city')


		setClinics(properties.clinics)
		if(city){
			setClientCity(city)
		}


		getAsyncData()



		// eslint-disable-next-line
	}, [clinics]);



	const getAsyncData = async () => {
		try {
			const res = await properties.setClinicAppointments()
			console.log(res)
			// await getAllClinicsHours();

		} catch (error) {
			console.log(error)
		}

	}



	const getAllClinicsHours = () => {
		clinics.clinics.forEach((clinic) => {
			console.log("Hola");
			properties.fetchAvailableHours(clinic.keycli, "BI");
			properties.fetchAvailableHours(clinic.keycli, "BIDI");
		});
	}
 
	const navigateTo = (url) => history.push(url); //


	const handleEventSelect = ($event) => selectClinic($event.value);
	const handleEventAccept = () => {
		if (selectedClinic != null) properties.setAppoinmentConfig("city", selectedClinic);
	};

	const updateAppointment = (data) => {};

	return (
		<div className="wrapper-general">

			<div className="title-seccion">
				<h1>Standort wählen</h1>
			</div>
			<div className="city-appointment-container">
				<CardContainer isColumn={true}>
						{cities.map((city) => 
							<Card>
							   <img src={city.icon} alt={city.icon} className="type-image-city"/>
								<p>
								{city.name}
								</p>
							</Card>
						)
					}

				</CardContainer>
				{/* <div className="container-row">
					<Button action={handleEventAccept} styleType={"rounded-button"} label={"fortsetzen"} />
				</div> */}
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
	 */
	setClinicAppointments: () => dispatch(setClinicAppointments()),

	/**
	 * 
	 * @param {String} keycli Código de la ciudad
	 * @param {('BI' | 'BIDI')} appointments_type Tipo de cita BI = Gratis | BIDI = Pago 
	 */

	fetchAvailableHours: (keycli, appointments_type) =>
		dispatch(fetchAvailableHours(keycli, appointments_type)),
});

const mapStateToProps = (state) => {
	return {
		clinics: state.clinics,
		appointment: state.appointment,
		available_hours: state.available_hours,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CityAppointmentPage);
