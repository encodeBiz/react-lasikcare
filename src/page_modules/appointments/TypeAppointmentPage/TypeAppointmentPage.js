import React from "react";
import "./TypeAppointmentPage.scss";
import CardContainer from "../../../shared_modules/CardContainer/CardContainer";
import StepTitle from "../../../shared_modules/StepTitle/StepTitle";
import Card from "../../../shared_modules/Card/Card";
import testImage from "../../../assets/images/icons/doctor-color-icon.svg"
import { connect } from "react-redux";
import { useHistory } from "react-router";
import Stepper from "../../../shared_modules/Stepper/Stepper";
import { setAppoinmentConfig } from "../../../redux/appointment_config/appointmentConfig.actions";

/**
 * 
 * @param {Object} properties
 * @param {Function} properties.getAppointmentByType Envía al reducer el tipo de cita que se ha seleccionado. 
 *   
 */


const TypeAppointmentPage = (properties) => {

	const history = useHistory()

	const appointmentTypes = [
		{
			text: "Unverbindliches Informationsgespräch + Ärltliche Voruntersuchung(ca. 40€)", 
			image: testImage,
			type: "type_1", 
		}, 
		{
			text: "Unverbindliches Informationsgespräch",
			image: testImage, 
			type: "type_2"
		}
	]


	const onAppointmentTypeSelection = (type) => {
		console.log(type)

		history.push("/appointments/city")
		// properties.getAppointmentByType(type)

	}

	return (
		<React.Fragment>
			<Stepper />
			<StepTitle text={'Terminart wählen'} number={1}/>		
			<CardContainer isColumn={true}>
				{appointmentTypes.map((typeItem, index) => {
					return (
						<Card key={index} handleClick={onAppointmentTypeSelection} clickParam={typeItem.type} >
							<img src={typeItem.image} alt="..." className="type-image"/>
							<p>{typeItem.text}</p>
						</Card>
					)
				})}
            </CardContainer>
		</React.Fragment>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		setAppoinmentConfig: (property, data) => dispatch(setAppoinmentConfig(property, data))
	}
}




export default connect(undefined, mapDispatchToProps)(TypeAppointmentPage);
