import React, { useEffect } from "react";
import Button from "../Button/Button";
import "./Navbar.scss";
import logoLasik from "../../assets/images/icons/logo_lasik.jpg";
import { Link } from "react-router-dom";
import { IMAGES_SERVER } from "../../constants/constants";

const Navbar = () => {
	useEffect(() => {
		// Devuelve los query parameters de la url

		const sPageURL = decodeURIComponent(window.location.search.substring(1));
		const sURLVariables = sPageURL.split("&");
		let i;
		const sParameterName = [];
		for (i = 0; i < sURLVariables.length; i++) {
			let tmp = sURLVariables[i].split("=");
			if (tmp[0] !== "" && tmp[1] !== undefined) {
				sParameterName[tmp[0]] = tmp[1];
			}
		}
		window.utm_source = sParameterName["utm_source"];
	}, []);

	// Se debe de añadir el TMR

	const handleEventAccept = () => "";

	return (
		<div className="navbar-container">
			<div className="logo">
				<Link to="/">
					<img
						src={process.env.NODE_ENV === "development" ? logoLasik : IMAGES_SERVER + logoLasik}
						alt="..."
					></img>
				</Link>
			</div>
			<div className="second-nav">
				<Button action={handleEventAccept} styleType={"nav-number"} label={"0800 8888 60 60"} />
				<div className="hamburguer">
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
