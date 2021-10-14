import React, { useContext, useEffect } from "react";
import "../../styles/home.scss";
import { Button, Card, CardGroup, Row } from "react-bootstrap";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";

const CardRutas = () => {
	const history = useHistory();
	const { store, actions } = useContext(Context);
	return (
		<div className="content">
			<h1 className="text-success text-center">RUTAS</h1>
			<div className="card-Container">
				{/*<CardGroup className="card-group-scroll">*/}
				<Row lg="auto" className="ml-4">
					{store.routes.map((item, id) => (
						<Card key={id} className="m-3 card">
							<Card.Img variant="top" src={item.photo} />
							<Card.Body>
								<Card.Title>{item.name}</Card.Title>
								<Card.Text>{`Inicio: ${item.start_point}`}</Card.Text>
								<Card.Text> {`Etapas: ${item.stages_number}`}</Card.Text>
								<Card.Text>{`Longitud: ${item.length}`}</Card.Text>
								<Button
									className="m-2"
									variant="outline-primary"
									onClick={() => history.push(`/route/${id}`)}>
									Ver más
								</Button>
							</Card.Body>
						</Card>
					))}
				</Row>
				{/*</CardGroup>*/}
			</div>
		</div>
	);
};

export default CardRutas;

/*
<Row xs={1} md={2} className="g-4">
  {Array.from({ length: 4 }).map((_, idx) => (
	<Col>
	  <Card>
		<Card.Img variant="top" src="holder.js/100px160" />
		<Card.Body>
		  <Card.Title>Card title</Card.Title>
		  <Card.Text>
			This is a longer card with supporting text below as a natural
			lead-in to additional content. This content is a little bit longer.
		  </Card.Text>
		</Card.Body>
	  </Card>
	</Col>
  ))}
</Row>
*/
