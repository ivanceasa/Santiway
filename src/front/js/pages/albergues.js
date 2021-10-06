import React from "react";
import { Link } from "react-router-dom";
import SearchAlbergues from "../component/SearchAlbergues";

const Albergues = () => {
	return (
		<>
			<Link to="/">
				<span className="navbar-brand">Home</span>
			</Link>
			<h1>Búsqueda de albergues</h1>
			<SearchAlbergues />
		</>
	);
};

export default Albergues;
