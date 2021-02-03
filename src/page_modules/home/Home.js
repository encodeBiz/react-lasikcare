import React from "react";
import { Link } from "react-router-dom";
import "./Home.scss";

const Home = () => {
	return (
		<React.Fragment>
			<div>
				<Link to="/appointments">Appointments</Link>
			</div>
			<div>
				<Link to="/videollamadas">Online</Link>
			</div>
		</React.Fragment>
	);
};

export default Home;
