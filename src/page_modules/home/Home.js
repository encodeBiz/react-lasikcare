import React from "react";
import { Link } from "react-router-dom";
import CardContainer from "../../shared_modules/CardContainer/CardContainer";
import Card from "../../shared_modules/Card/Card";
import image from "../../assets/images/icons/doctor-color-icon.svg";
import "./Home.scss";

const Home = () => {
	const homeLinksConfig = [
		{
			title: "Zu Hause",
			image,
			subtitle: "Online video-beratung von zu hause aus",
		},
		{
			title: "Vor Ort",
			image,
			subtitle: "Vor-ort beratung im nächstgelegenen Lasik Care standort",
		},
	];

	return (
		<React.Fragment>
			<h1 className="home-title">
				Bitte wählen Sie Ihren <br /> Wunschtermin
			</h1>
			<CardContainer>
				{homeLinksConfig.map((link, index) => {
					return (
						<Card>
							<div className="card"> 
								<h3>{link.title}</h3>
								<img className="home-card-image" src={link.image} alt="..." />
								<p>{link.subtitle}</p>
							</div>
						</Card>
					);
				})}
			</CardContainer>
		</React.Fragment>
	);
};

export default Home;
