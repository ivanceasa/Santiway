import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rutasDetail from "../../styles/rutasDetail.scss";
import { FormattedMessage } from "react-intl";

const RutasDetails = () => {
	const { store, actions } = useContext(Context);
	const { detailsId } = useParams();

	return (
		<>
			{store.routes.map((item, id) => {
				if (id === parseInt(detailsId)) {
					return (
						<div>
							<div key={id}>
								<div className="text-center text-success m-4 p-4">
									<h1 className="h1-detail-rutas text-success text-center pt-3 font-weight-bold">
										{item.name}
									</h1>
									<img className="img-detail" src={item.map} />
								</div>
								<div className="container-details text-center text-success px-3 mx-3">
									<h1 className="h1-detail-rutas text-success text-center pt-3 font-weight-bold">
										<FormattedMessage id="routes.profile" defaultMessage="Perfil-etapas" />
									</h1>
									<div className="parche-img" />
									<img className="img-detail" src={item.profile} />
								</div>
							</div>
						</div>
					);
				}
			})}
		</>
	);
};

export default RutasDetails;
