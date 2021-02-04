import React, { useEffect, useState } from "react";
import CardContainer from "../../../shared_modules/CardContainer/CardContainer";
import RoundedButton from "../../../shared_modules/RoundedButton/RoundedButton";
import Stepper from "../../../shared_modules/Stepper/Stepper";

import "./CityAppointmentPage.scss";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import Button from "../../../shared_modules/Button/Button";
import { componentDidUpdate } from "../../../redux/redux.helper";

/**
 * 
 * @param {Object} properties 
 * @param {Promise} properties.clinics Clínicas disponibles
 */
const CityAppointmentPage = (properties) => {
	const [clinicsState, setClinics] = useState({status: 'pending', clinics: []})
	const goBack = useHistory().goBack;
	useEffect(() => {
		properties.clinics
		.then(_c => {
			setClinics(_c.clinics)
			console.log(clinicsState, _c)
		})
	}, [clinicsState])

	const paintCities = ()=>{
		if(clinicsState.clinics)
		 return clinicsState.clinics.map((clinic, index)=>{
				return  <h1 id={clinic.keycli} key={clinic.keycli}>{clinic.name}</h1>
			})
		else return <h1>LOADING</h1>
	}
	
	return (
		<React.Fragment>
			<h1>City Appointment</h1>

			<Stepper />
			<div className="top-content">
				<Button action={goBack} type={"back-button"} label={"Züruch"} />
			</div>
			<CardContainer>
				{		
						paintCities()
				}
			</CardContainer>
			
		</React.Fragment>
	);
};

const mapStateToProps = (store) => {
	return {
		appointment: store.appointment,
		clinics: store.clinics
	};
};

export default connect(mapStateToProps)(CityAppointmentPage);
