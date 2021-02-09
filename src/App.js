import React, { useEffect, useState } from "react";
import CardContainer from "./shared_modules/CardContainer/CardContainer";
import Card from "./shared_modules/Card/Card";
import "./styles/App.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import doctorIcon from "./assets/images/icons/doctor-color-icon.svg";

function Home() {
	const [clientCity, setClientCity] = useState(null);

	const homeLinksConfig = [
		{
			title: "Zu Hause",
			image: null,
			subtitle: "Online video-beratung von zu hause aus",
			url: "/videollamadas",
		},
		{
			title: "Vor Ort",
			image: null,
			subtitle: "Vor-ort beratung im nächstgelegenen Lasik Care standort",
			url: "/appointments",
		},
	];

	useEffect(() => {
		/// GET APPOINTMENTS
		const city = localStorage.getItem("city");

		if (city) {
			setClientCity(city);
			getAppointmentHours(clientCity);
		}
		// eslint-disable-next-line 
	}, []);



	const getAppointmentHours = async () => {
		try {
			/// GET APPOINTMENTS DISPATCH
		} catch (error) {}
	};

	return (
		<React.Fragment>
			<h1 className="main-title">
				Bitte wählen Sie Ihren <br /> Wunschtermin
			</h1>
			<CardContainer isColumn={false}>
				{homeLinksConfig.map((link, index) => {
					return (
						<Link to={link.url} key={index}>
							<Card>
								<div className="home-card">
									<h3>{link.title}</h3>
									<div>
										<img className="home-card-image" src={doctorIcon} alt="..." />
									</div>
									<p>{link.subtitle}</p>
								</div>
							</Card>
						</Link>
					);
				})}
			</CardContainer>
		</React.Fragment>
	);
}

export default connect()(Home);
