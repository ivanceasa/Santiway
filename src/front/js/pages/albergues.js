import React from "react";
import { Link } from "react-router-dom";

const Albergues = () => {
	return (
		<>
			<Link to="/">
				<span className="navbar-brand">Home</span>
			</Link>
			<h1>Esto son Albergues</h1>
		</>
	);
};

export default Albergues;
