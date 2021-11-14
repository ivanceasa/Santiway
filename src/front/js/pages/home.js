import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import portada from "../../img/santiago-path.jpg";
import { Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { langContext } from "../store/langContext";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const language = useContext(langContext);
	console.log(language);

	useEffect(
		() => {
			if (store.token && store.token != "" && store.token != undefined) actions.getMessage();
		},
		[store.token]
	);

	return (
		<>
			{/*<IntlProvider locale="es" messages={MensajesEspañol}>*/}
			<div className="card bg-dark text-white">
				<img src={portada} className="img" alt="..." />
				<div className=" texto-home card-img-overlay">
					<Row>
						<Col>
							<h1 className="card-title-home font-weight-bold display-1 m-4">
								<FormattedMessage id="home.welcome" defaultMessage="Bienvenido Peregrino!" />
							</h1>
							<p className="card-text display-4 m-4">
								<FormattedMessage
									id="home.desc"
									defaultMessage="Conoce las rutas, encuentra tu albergue y recibe consejos para el viaje"
								/>
							</p>
							<Link to="/register">
								<Button className=" button-home card-text display-4 m-4">
									<FormattedMessage
										id="home.button"
										defaultMessage="Regístrate y comparte tu experiencia!"
									/>
								</Button>
							</Link>
						</Col>
						<Col />
					</Row>
				</div>
			</div>
			{/*</IntlProvider>*/}
		</>
	);
};
