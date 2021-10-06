import React from "react";

const SearchAlbergues = () => {
	return (
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
	);
};

export default SearchAlbergues;
