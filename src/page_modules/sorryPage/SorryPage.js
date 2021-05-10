import React from "react";
import { useHistory } from "react-router";
import Button from "../../shared_modules/Button/Button";
import "./SorryPage.scss";
import lens from "../../assets/images/icons/icon-search.svg";

const SorryPage = () => {
	const history = useHistory();

	const goToCalendar = () => history.push("/appointments/calendar");

	return (
		<div className="wrapper-general">
			<div class="wrapper-img">
				<img src={lens} alt="" />
			</div>

			<div class="wrapper-text">
				<h2 className="uns-leid">Es tut uns leid</h2>
				<p>
					Es scheint, dass für diesen Tag keine <br />
					Daten mehr übrig sind. Lassen Sie <br />
					uns Ihnen helfen, eine zu finden
				</p>
			</div>
			<div className="buttons-container">
				<Button styleType={"rounded-button small-margin"} label="KONTAKTIERE UNS"></Button>
				<Button
					styleType={"transparent-button small-margin"}
					label="ZURÜCK ZUR TERMINAUSWAH"
					action={goToCalendar}
				></Button>
			</div>
		</div>
	);
};

export default SorryPage;
