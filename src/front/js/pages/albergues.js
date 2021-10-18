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
			<SearchAlbergues />
		</>
	);
};

export default Albergues;
