import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import { Button, Card, CardGroup, Row } from "react-bootstrap";

const SearchAlbergues = () => {
	const { store, actions } = useContext(Context);
	const history = useHistory();

	const [search, setSearch] = useState("");

	const handleChange = e => {
		setSearch(e.target.value);
	};

	return (
		<div className="container">
			<h1 className="text-center pt-5">Encuentra tu albergue</h1>
			<div className="container mt-3">
				<div className="input-group  mx-auto w-75 p-3">
					<input
						type="text"
						className="form-control"
						value={search}
						onChange={handleChange}
						placeholder="Búsqueda por municipio"
					/>
					<span className="input-group-btn">
						<button className="btn btn-success" type="submit">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								className="bi bi-search"
								viewBox="0 0 16 16">
								<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
							</svg>
						</button>
					</span>
				</div>
			</div>
			<div className="hostels-Container text-center">
				<Row lg="4" className="ml-5">
					{store.hostels
						.filter(element => {
							if (search == "") {
								return "";
							} else if (element.city.toLowerCase().includes(search.toLowerCase())) {
								return element;
							}
						})
						.map((item, id) => (
							<Card key={id} className="m-3 card">
								<Card.Img variant="top" src={item.photo_hostel} />
								<Card.Body>
									<Card.Title>{item.name}</Card.Title>
									<Card.Text>{`Municipio: ${item.city}`}</Card.Text>
									<Card.Text> {`Teléfono: ${item.phone_number}`}</Card.Text>
								</Card.Body>
							</Card>
						))}
				</Row>
			</div>
		</div>
	);
};

export default SearchAlbergues;
