/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useHistory } from "react-router";
import Button from "../../shared_modules/Button/Button";
import "./SorryPage.scss";
import lens from "../../assets/images/icons/icon-search.svg";
import { clearAppointment } from "../../redux/appointment_config/appointmentConfig.actions";
import { connect } from "react-redux";
import { IMAGES_SERVER } from "../../constants/constants";

const SorryPage = (properties) => {
	const history = useHistory();

	const goToCalendar = () => history.push("/termintyp/vor-ort/datum/");
	const goToHome = () => (window.location.href = "https://www.lasikcare.de/");

	const { clearAppointment } = properties;

	useEffect(() => {
		clearAppointment();
	}, []);

	return (
		<div className="wrapper-general">
			<div className="wrapper-img">
				<img src={process.env.NODE_ENV === "development" ? lens : IMAGES_SERVER + lens} alt="" />
			</div>

			<div className="wrapper-text">
				<h2 className="uns-leid">Es tut uns leid</h2>
				<p>
					Es scheint, dass für diesen Tag keine <br />
					Daten mehr übrig sind. Lassen Sie <br />
					uns Ihnen helfen, eine zu finden
				</p>
			</div>
			<div className="buttons-container">
				<Button
					styleType={"rounded-button small-margin"}
					label="KONTAKTIERE UNS"
					action={() => goToHome()}
				></Button>
				<Button
					styleType={"transparent-button small-margin"}
					label="ZURÜCK ZUR TERMINAUSWAH"
					action={() => goToCalendar()}
				></Button>
			</div>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	clearAppointment: () => dispatch(clearAppointment()),
});

export default connect(undefined, mapDispatchToProps)(SorryPage);
