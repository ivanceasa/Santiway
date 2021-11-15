import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { loadStripe } from "@stripe/stripe-js";
import booking from "../../img/iconobuencamino.jpg";
import "../../styles/StripePay.scss";
import { FormattedMessage } from "react-intl";

const stripePromise = loadStripe(
	"pk_test_51JpGcyErK9vFHAnpjzQwt3orpJwK1DQ3sntDLKbOAfBIEz4zVi13q4SzHy7cqTRVgZk9xJ1bRIaZgGvrVZuDM2gU000wdSvPDI"
);

const Stripe = () => {
	const { store, actions } = useContext(Context);

	async function handleClick() {
		const stripe = await stripePromise;
		const response = await fetch(`${process.env.BACKEND_URL}/api/create-checkout-session`, {
			method: "POST"
		});
		const session = await response.json();
		const result = await stripe.redirectToCheckout({
			sessionId: session.id
		});

		if (result.error) {
			//result.error.message
		}
	}

	return (
		<div className="container-checkout text-center mt-5 mb-5">
			<div className="product m-5">
				<img className="img-booking" src={booking} alt="The cover of Stubborn Attachments" />
				<div className="description-reserva">
					<h1>
						<FormattedMessage id="stripe.title" defaultMessage="Reserva Albergue" />
					</h1>
					<h2>12€</h2>
				</div>
			</div>
			<button
				className="btn-checkout btn btn-warning"
				type="submit"
				id="checkout-button"
				role="link"
				onClick={handleClick}>
				<FormattedMessage id="stripe.button" defaultMessage="Verificar" />
			</button>
		</div>
	);
};

export default Stripe;
