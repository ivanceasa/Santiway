import React, { Component, useContext } from "react";
import "../../styles/StripePay.css";
import { Context } from "../store/appContext";
import { loadStripe } from "@stripe/stripe-js";
// import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Card } from "react-bootstrap";

const stripePromise = loadStripe(
	"pk_test_51JpGcyErK9vFHAnpjzQwt3orpJwK1DQ3sntDLKbOAfBIEz4zVi13q4SzHy7cqTRVgZk9xJ1bRIaZgGvrVZuDM2gU000wdSvPDI"
);

const StripePay = () => {
	const { store, actions } = useContext(Context);

	async function handleClick() {
		const stripe = await stripePromise;
		const url = process.env.BACKEND_URL + "/api/create-checkout-session";
		const response = await fetch(url, {
			method: "POST"
		});
		const session = await response.json();

		const result = await stripe.redirectToCheckout({
			sessionId: session.id
		});
		if (result.error) {
		}
	}

	return (
		<div>
			<div className="product">
				<img src="https://i.imgur.com/EHyR2nP.png" alt="The cover of Stubborn Attachments" />
				<div className="description">
					<h3>Stubborn Attachments</h3>
					<h5>$20.00</h5>
				</div>
			</div>
			<button type="button" id="checkout-button" role="link" onClick={handleClick}>
				Checkout
			</button>
		</div>
	);
};

export default StripePay;
