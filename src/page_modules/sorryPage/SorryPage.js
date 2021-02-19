import React from "react";
import { useHistory } from "react-router";
import Button from "../../shared_modules/Button/Button";
import "./SorryPage.scss"

const SorryPage = () => {
	const history = useHistory()

	const goToCalendar = () => history.push("/appointments/calendar")

	return (
		<div className="wrapper-general sorry-page">

			<div className="sorry-text">
				<h3>Es tut uns leid</h3>
				<p>
					Es scheint, dass für diesen Tag keine Daten mehr übrig sing. Lassen Sie uns Ihnen helfen,
					eine zu finden
				</p>
			</div>

			<div className="buttons-container">
				<Button label="KONTAKTIERE UNS"></Button>
				<Button label="ZURÜCK ZUR TERMINAUSWAH" customClass={"secondary-btn"} action={goToCalendar}></Button>
			</div>
		</div>
	);
};

export default SorryPage;
