import React from "react";
import { useHistory } from "react-router";
import Button from "../../shared_modules/Button/Button";
import "./SorryPage.scss";
import lens from "../../assets/images/icons/icon-search.svg";


const SorryPage = () => {
	const history = useHistory()

	const goToCalendar = () => history.push("/appointments/calendar")

  return (
    <div className="wrapper-general ">
		<div class="wrapper-img">
			<img src={lens} alt=""/>
		</div>

		<div class="wrapper-text">
			<p>Es scheint, dass für diesen Tag keine Daten mehr übrig sind. Lassen Sie uns Ihnen helfen, eine zu finden</p>
		</div>
        <Button label="KONTAKTIERE UNS"></Button>
        <Button label="ZURÜCK ZUR TERMINAUSWAH" action={goToCalendar}></Button>
    </div>
  );
};

export default SorryPage;
