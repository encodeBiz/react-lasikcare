import React from "react";
import "./Loading.scss";
import loader from "../../assets/images/loader.svg";
import { IMAGES_SERVER } from "../../constants/constants";

/**
 * @description Componente que renderiza una animación mientras se cargan datos.
 */

const Loading = () => {
	return (
		<div className="loading-container">
			<div className="loading">
				<img
					src={process.env.NODE_ENV === "development" ? loader : IMAGES_SERVER + loader}
					alt=""
				/>
			</div>
		</div>
	);
};

export default Loading;
