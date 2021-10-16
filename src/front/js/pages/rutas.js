import React, { useContext, useEffect } from "react";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import CardRutas from "../component/CardRutas";

const Rutas = () => {
	const { store, actions } = useContext(Context);
	useEffect(() => {
		actions.getRoutes();
	}, []);

	return (
		<>
			<CardRutas />
		</>
	);
};

export default Rutas;
