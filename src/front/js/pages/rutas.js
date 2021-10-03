import React from "react";
import { Link } from "react-router-dom";

const Rutas = () => {
	return (
		<>
			<Link to="/">
				<span className="navbar-brand">Home</span>
			</Link>
			<h1>Esto son Rutas</h1>
		</>
	);
};

export default Rutas;
