import React from "react";
import { Link } from "react-router-dom";
import "../../styles/confirm.scss";
import { FormattedMessage } from "react-intl";

const Confirm = () => {
	return (
		<>
			<h1 className="confirmationPage text-center text-success font-weight-bold my-5 p-5 font-italic">
				<FormattedMessage id="confirm" defaultMessage="Su reserva ha sido realizada con éxito" />
			</h1>
		</>
	);
};

export default Confirm;
