import React, { Component } from "react";
import "../../styles/StripePay.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Card } from "react-bootstrap";

const StripePay = () => {
	const stripePromise = loadStripe(
		"pk_test_51JpGcyErK9vFHAnpjzQwt3orpJwK1DQ3sntDLKbOAfBIEz4zVi13q4SzHy7cqTRVgZk9xJ1bRIaZgGvrVZuDM2gU000wdSvPDI"
	);

	const CheckoutForm = () => {
		const stripe = useStripe();
		const elements = useElements();

		const handleSubmit = async e => {
			e.preventDefault();

			const { error, paymentMethod } = await stripe.createPaymentMethod({
				type: "card",
				card: elements.getElement(CardElement)
			});

			if (!error) {
				return console.log(paymentMethod);
			}
		};
		return (
			<form onSubmit={handleSubmit} className="card card-body border border-success mt-4">
				<img
					src="http://www.turismo.gal/imaxes/mdaw/mtgw/~edisp/~extract/TURGA180658~1~staticrendition/tg_carrusel_cabecera_grande.jpg"
					alt="Albergue de peregrinos de Gontán"
					className="img-fluid mb-2"
				/>
				<div className="form-group">
					<CardElement className="form-control" />
				</div>
				<button className="btn btn-success">Comprar</button>
			</form>
		);
	};

	return (
		<Elements stripe={stripePromise}>
			<div className="container">
				<div className="row">
					<div className="col-md4 offset-md-4">
						<CheckoutForm />
					</div>
				</div>
			</div>
		</Elements>
	);
};

export default StripePay;
