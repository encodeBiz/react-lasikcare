import React from "react";
import Button from "../../shared_modules/Button/Button";
import "./SorryPage.scss";
import CardContainer from "../../shared_modules/CardContainer/CardContainer";
import ErrorDialog from "../../shared_modules/ErrorDialog/ErrorDialog";
import lens from "../../assets/images/icons/icon-search.svg";


const SorryPage = () => {
  return (
    <div className="wrapper-general ">
		<div class="wrapper-img">
			<img src={lens} alt=""/>
		</div>

		<div class="wrapper-text">
			<p>Es scheint, dass für diesen Tag keine Daten mehr übrig sind. Lassen Sie uns Ihnen helfen, eine zu finden</p>
		</div>
        <Button label="KONTAKTIERE UNS"></Button>
        <Button label="ZURÜCK ZUR TERMINAUSWAH"></Button>
    </div>
  );
};

export default SorryPage;
