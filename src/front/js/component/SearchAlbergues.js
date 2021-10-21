import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useHistory, Link } from "react-router-dom";
import { Card, Row, Button } from "react-bootstrap";
import hostelImage from "../../img/orreo.jpg";
import "../../styles/searchAlbergues.scss";

const SearchAlbergues = () => {
	const { store, actions } = useContext(Context);
	const history = useHistory();

	const [search, setSearch] = useState("");

	const handleChange = e => {
		setSearch(e.target.value);
	};
	let filteredResults = [];
	filteredResults = store.hostels.filter(element => {
		if (search == "") {
			return "";
		} else if (
			element.city
				.toLowerCase()
				.normalize("NFD")
				.replace(/[\u0300-\u036f]/g, "")
				.includes(search.toLowerCase())
		) {
			return element;
		}
	});
	console.log(filteredResults);

	return (
		<div className="card">
			<img src={hostelImage} className="img-hostel" alt="..." />
			<div className="card-img-overlay">
				<h1 className="text-center p-4 font-weight-bold">ENCUENTRA TU ALBERGUE</h1>
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

				{filteredResults.length == 0 && search.length != 0 ? (
					<h1 className="text-center text-white font-weight-bold mt-4 font-italic">
						No hay albergues en ese municipio
					</h1>
				) : (
					<div className="hostels-Container text-center">
						<Row lg="4" className="ml-5">
							{filteredResults.map((item, id) => (
								<Card key={id} className="m-3 card">
									<Card.Img variant="top" src={item.photo_hostel} />
									<Card.Body>
										<Card.Title>{item.name}</Card.Title>
										<Card.Text>{`Municipio: ${item.city}`}</Card.Text>
										<Card.Text> {`Teléfono: ${item.phone_number}`}</Card.Text>
										<Button
											className="m-2"
											variant="outline-primary"
											onClick={() => history.push(`/albergues/${id}`)}>
											Reservar
										</Button>
									</Card.Body>
								</Card>
							))}
						</Row>
					</div>
				)}
			</div>
		</div>
	);
};

export default SearchAlbergues;
