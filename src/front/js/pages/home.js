import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";

export const Home = () => {
	const { store, actions } = useContext(Context);
	useEffect(
		() => {
			if (store.token && store.token != "" && store.token != undefined) actions.getMessage();
		},
		[store.token]
	);

	return (
		<div className="text-center mt-5">
			<h1>Esto es Home</h1>
		</div>
	);
};
