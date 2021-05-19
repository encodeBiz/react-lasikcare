import React from "react";
import Stepper from "../../../shared_modules/Stepper/Stepper";
import CardContainer from "../../../shared_modules/CardContainer/CardContainer";

import "./ConfirmOnlinePage.scss";
import Button from "../../../shared_modules/Button/Button";
import { connect } from "react-redux";


const ConfirmOnlinePage = (properties) => {
	const { appointment } = properties;
	console.log(appointment)

	return <React.Fragment>Hola</React.Fragment>;
};

const mapStateToProps = ({ appointment }) => ({
	appointment,
});

export default connect(mapStateToProps)(ConfirmOnlinePage);
