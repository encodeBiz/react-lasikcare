import React, { useEffect } from "react";
import CardContainer from "../../shared_modules/CardContainer/CardContainer";
import Card from "../../shared_modules/Card/Card";
import image from "../../assets/images/icons/doctor-color-icon.svg";
import "./Home.scss";
import { getClinicas, getHuecos } from "../../services/appointments.service";

function Home() {
	getClinicas()
  .then(res => {
    console.log('getClinicas', res)
  })
  .then(() => {
    const params = {
			keycli: 'GR021',
			date: new Date(new Date().setMonth(2)).toLocaleDateString(),
			type: 'BIDI'
    };
    
    getHuecos(params)
    .then(res => {
      console.log('getHuecos', res)
    })
  })

	const homeLinksConfig = [
		{
			title: "Zu Hause",
			image,
			subtitle: "Online video-beratung von zu hause aus",
			url: "/videollamadas",
		},
		{
			title: "Vor Ort",
			image,
			subtitle: "Vor-ort beratung im nächstgelegenen Lasik Care standort",
			url: "/appointments",
		},
	];


	useEffect(() => {
		
		/// GET APPOINTMENTS 

		getAppointmentHours()

	}, [])


	const getAppointmentHours = async () => {
		try {
			/// GET APPOINTMENTS DISPATCH
		} catch (error) {
			
		}
	}




	return (
		<React.Fragment>
			<h1 className="home-title">
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
										<img className="home-card-image" src={link.image} alt="..." />
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
};

export default connect()(Home) ;
