import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useHistory, Link } from "react-router-dom";
import { Card, Row, Button } from "react-bootstrap";
import hostelImage from "../../img/orreo.jpg";
import hostelIcono from "../../img/hostelIcono.jpg";
import "../../styles/searchAlbergues.scss";
import { FormattedMessage, injectIntl } from "react-intl";
import PropTypes from "prop-types";

const SearchAlbergues = ({ intl }) => {
	const { store, actions } = useContext(Context);
	const history = useHistory();
	const placeholderSearch = intl.formatMessage({ id: "hostels.search" });

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
		<div className="content-albergues">
			<div className="card">
				<h1 className="h1-albergues text-success text-center pt-3 font-weight-bold">
					<FormattedMessage id="hostels.title" defaultMessage="ENCUENTRA TU ALBERGUE" />
				</h1>
				{/*<img src={hostelImage} className="img-hostel" style={{ height: "1250px" }} alt="..." />*/}
				<div className="card-albergues">
					<div>
						<div className="container mt-3">
							<div className="input-group  w-75 p-3 m-auto">
								<input
									type="text"
									className="form-control mt-4"
									value={search}
									onChange={handleChange}
									placeholder={placeholderSearch}
								/>
								<span className="input-group-btn">
									<button className="searchIcon btn btn-success" type="submit">
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
						<img className="hostel-icono" src={hostelIcono} />

						{filteredResults.length == 0 && search.length != 0 ? (
							<h1 className="h1-albergues-2 text-center font-weight-bold font-italic">
								<FormattedMessage
									id="hostels.notFound"
									defaultMessage="No hay albergues en ese municipio"
								/>
							</h1>
						) : (
							<div className="hostels-Container text-center">
								<Row lg="4" className="row-albergues">
									{filteredResults.map((item, id) => (
										<Card key={id} className="card-albergues-ind m-3 card">
											<Card.Img img-albergues variant="top" src={item.photo_hostel} />
											<Card.Body>
												<Card.Title className="titulo-albergue">{item.name}</Card.Title>
												<Card.Text>
													<span className="texto-albergue">
														<FormattedMessage
															id="hostel.city"
															defaultMessage="Municipio: "
														/>
													</span>
													{`${item.city}`}
												</Card.Text>
												<Card.Text>
													<span className="texto-albergue">
														<FormattedMessage
															id="hostel.phone"
															defaultMessage="Teléfono: "
														/>
													</span>
													{`${item.phone_number}`}
												</Card.Text>
												<Button
													className="button-reservas"
													variant="btn btn-warning"
													onClick={() => history.push(`/albergues/${item.name}`)}>
													<FormattedMessage id="hostel.book" defaultMessage="Reservar" />
												</Button>
											</Card.Body>
										</Card>
									))}
								</Row>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

SearchAlbergues.propTypes = {
	intl: PropTypes.object
};
export default injectIntl(SearchAlbergues);
