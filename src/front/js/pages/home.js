import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import Login from "/workspace/pruebaspro/src/front/js/pages/login/Login.js";
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
			<Login />
		</div>
	);
};
