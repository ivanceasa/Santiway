import React, { useContext, useEffect } from "react";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
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
