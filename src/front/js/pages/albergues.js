import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import SearchAlbergues from "../component/SearchAlbergues";

const Albergues = () => {
	const { store, actions } = useContext(Context);
	useEffect(() => {
		actions.getHostels();
	}, []);
	return (
		<>
			<Link to="/">
				<span className="navbar-brand">Home</span>
			</Link>

			<SearchAlbergues />
		</>
	);
};

export default Albergues;
