import React from "react";

const SearchAlbergues = () => {
	return (
		<div className="container">
			<h1 className="text-center pt-5">Encuentra tu albergue</h1>
			<div className="container mt-3">
				<div className="input-group  mx-auto w-75 p-3">
					<input type="text" className="form-control" placeholder="Búsqueda por municipio" />
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
		</div>
		/*
		<div className="container">
			<form>
				<div className="form-row">
					<div className="col-md-6 mb-3">
						<label htmlFor="validationDefault01">Nombre:</label>
						<input type="text" className="form-control" id="validationDefault01" value="" />
					</div>
				</div>

				<div className="form-row">
					<div className="col-md-3 mb-3">
						<label htmlFor="validationServer04">Ruta</label>
						<select className="custom-select">
							<option selected disabled value="" />
							<option value="" />
						</select>
					</div>
				</div>

				<div className="form-row">
					<div className="col-md-3 mb-3">
						<label htmlFor="validationServer04">Municipio</label>
						<select className="custom-select">
							<option selected disabled value="" />
							<option value="" />
						</select>
					</div>
				</div>

				<button className="btn btn-primary" type="submit">
					Buscar
				</button>
			</form>
		</div>
		*/
	);
};

export default SearchAlbergues;
