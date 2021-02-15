import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import doctorIcon from "./assets/images/icons/doctor-color-icon.svg";
import "./styles/App.scss";
import { fetchAvailableHours } from "./redux/available_hours/available_hours.actions";
import CardContainer from "./shared_modules/CardContainer/CardContainer";
import { Link } from "react-router-dom";
import Card from "./shared_modules/Card/Card";

/**
 * Página de ejemplo
 * @param {Object} properties Properties para la página
 * @param {Object} properties.store Store de redux
 * @param {Function} properties.getClinicsAppointments Acción para obtener las clínicas
 * @param {Function} properties.getHoursById  Acción para obtener los huecos dado una clinica y un tipo de cita
 */
function App(properties) {
	const [clinics, setClinics] = useState([]);
	// const [clientCity, setClientCity] = useState(null);

	const homeLinksConfig = [
		{
			title: "Zu Hause",
			image: null,
			subtitle: "Online video-beratung von zu hause aus",
			url: "/videollamadas",
		},
		{
			title: "Vor Ort",
			image: null,
			subtitle: "Vor-ort beratung im nächstgelegenen Lasik Care standort",
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
			await properties.setClinicAppointments();

			await getAllClinicsHours();
		} catch (error) {
			console.log(error);
		}
	};

	/**
	 *
	 */

	const getAllClinicsHours = () => {
		clinics.clinics.forEach((clinic) => {
			properties.fetchAvailableHours(clinic.keycli, "BI");
			properties.fetchAvailableHours(clinic.keycli, "BIDI");
		});
	};

	// properties.store.clinics.then( clinicsState => {
	//   if(clinicsState.clinics.status === 'finish' && !init ){
	//     setInit(true)
	//     const cli = clinicsState.clinics.clinics
	//     for (let index = 0; index < cli.length; index++) {
	//       const {keycli} = cli[index];
	//       properties.getHoursById(keycli,'BI')
	//       properties.getHoursById(keycli,'BIDI')
	//     }
	//   }
	// })

	// /* properties.store.available_hours.then(
	//   (_store) => {
	//     console.log('available_hours', _store)
	// }) */
	// properties.store.clinics.then( clinicsState => {
	//   if (clinicsState.clinics.status === 'finish'){
	//     setClinics(clinicsState.clinics.clinics)
	//   }
	// })


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
										<img className="home-card-image" src={doctorIcon} alt="..." />
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

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAvailableHours: (keycli, appointments_type) =>
			dispatch(fetchAvailableHours(keycli, appointments_type)),
	};
};

const mapStateToProps = (state) => ({
	clinics: state.clinics,
	available_hours: state.available_hours,
});

export default connect(mapDispatchToProps, mapStateToProps)(App);
