import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import doctorIcon from "./assets/images/icons/doctor-color-icon.svg";
import "./styles/App.scss";
import CardContainer from "./shared_modules/CardContainer/CardContainer";
import { Link } from "react-router-dom";
import Card from "./shared_modules/Card/Card";
import { setGlobalError } from "./redux/errors/errors.actions";
import { fetchOnlineAvailableHours } from "./redux/available_online_hours/available_online_hours.actions";
import { IMAGES_SERVER } from "./constants/constants";

/**
 * Página de ejemplo
 * @param {Object} properties Properties para la página
 * @param {Object} properties.store Store de redux
 * @param {Function} properties.getClinicsAppointments Acción para obtener las clínicas
 * @param {Function} properties.getHoursById  Acción para obtener los huecos dado una clinica y un tipo de cita
 * @param {Funcion} properties.setGlobalError Acción para setear un error
 */
function App(properties) {
	const [clinics, setClinics] = useState([]);

	const homeLinksConfig = [
		{
			title: "Zu Hause",
			image: null,
			subtitle: "Online Video-Beratung von zu Hause aus",
			url: "/videollamadas",
		},
		{
			title: "Vor Ort",
			image: null,
			subtitle: "Vor-ort beratung im nächstgelegenen LasikCare standort",
			url: "/appointments",
		},
	];

	useEffect(() => {
		const city = localStorage.getItem("city");
		setClinics(properties.clinics);
		if (city) {
			// setClientCity(city);
		}

		getAsyncData();
		// eslint-disable-next-line
	}, [clinics]);

	const getAsyncData = async () => {
		try {
			//   await properties.setClinicAppointments();

			//   await getAllClinicsHours();
			await getAllOnlineHours();
		} catch (error) {
			properties.setGlobalError(error);
		}
	};



	const getAllOnlineHours = async () => {
		const onlineHoursPromises = ["BI", "BIDI"].forEach((item) =>
			properties.fetchOnlineAvailableHours(item)
		);
		const res = await Promise.all(onlineHoursPromises);
	};

	return (
		<React.Fragment>
			<h1 className="main-title">
				Bitte wählen Sie Ihren <br /> Wunschtermin
			</h1>
			<CardContainer isColumn={false}>
				{homeLinksConfig.map((link, index) => {
					return (
						<Link to={link.url} key={index}>
							<Card>
								<div className="home-card">
									<h3>{link.title}</h3>
									<div>
										<img
											className="home-card-image"
											src={
												process.env.NODE_ENV === "development"
													? doctorIcon
													: IMAGES_SERVER + doctorIcon
											}
											alt="..."
										/>
									</div>
									<p>{link.subtitle}</p>
								</div>
							</Card>
						</Link>
					);
				})}
			</CardContainer>
		</React.Fragment>
	);
}

const mapDispatchToProps = (dispatch) => ({
	
	/**
	 *
	 * @param {String} appointments_type BI | BIDI Tipo de cita online que se pide
	 * @returns
	 */

	fetchOnlineAvailableHours: (appointments_type) =>
		dispatch(fetchOnlineAvailableHours(appointments_type)),

	/**
	 *
	 * @param {String} error
	 *
	 * Setea un nuevo error en Redux
	 */

	setGlobalError: (error) => dispatch(setGlobalError(error)),
});

const mapStateToProps = (state) => ({
	clinics: state.clinics,
	available_hours: state.available_hours,
	state,
});

export default connect(mapDispatchToProps, mapStateToProps)(App);
