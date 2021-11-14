import React, { useContext, useEffect } from "react";
import "../../styles/home.scss";
import "../../styles/cardRutas.scss";
import { Button, Card, CardGroup, Row } from "react-bootstrap";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";

const CardRutas = () => {
	const history = useHistory();
	const { store, actions } = useContext(Context);
	return (
		<div className="content">
			<h1 className=" h1-rutas text-success text-center pt-3 font-weight-bold">RUTAS</h1>
			<div className="container-rutas">
				<Row lg="auto" className=" fila-rutas ml-4">
					{store.routes.map((item, id) => (
						<Card key={id} className="m-3 card-rutas">
							<Card.Img className="imagen-rutas" variant="top" src={item.photo} />
							<Card.Body>
								<Card.Title className="titulo-ruta">{item.name}</Card.Title>
								<Card.Text>
									<span className="texto-ruta">Inicio:</span>
									{` ${item.start_point}`}
								</Card.Text>
								<Card.Text>
									<span className="texto-ruta">Etapas:</span> {` ${item.stages_number}`}
								</Card.Text>
								<Card.Text>
									<span className="texto-ruta">Longitud:</span>
									{` ${item.length}`}
								</Card.Text>
								<Button
									className=" boton-ruta"
									variant="outline-primary"
									onClick={() => history.push(`/rutas/${id}`)}>
									Ver más
								</Button>
							</Card.Body>
						</Card>
					))}
				</Row>
			</div>
		</div>
	);
};

export default CardRutas;
