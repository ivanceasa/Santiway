import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

const Booking = () => {
	const { store, actions } = useContext(Context);
	const [year, setYear] = useState(null);
	const [month, setMonth] = useState(null);
	const [day, setDay] = useState(null);

	function setDate(event) {
		const dateValue = event.target.value;
		const dateSplitted = dateValue.split("-");
		setYear(dateSplitted[0]);
		setMonth(dateSplitted[1]);
		setDay(dateSplitted[2]);
	}

	async function createBooking() {
		const response = await fetch(`${process.env.BACKEND_URL}/api/create-booking`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				year: year,
				month: month,
				day: day
			})
		});
	}

	return (
		<div className="text-center mt-5">
			<input type="date" onChange={setDate} />
			<button onClick={createBooking}>Realizar reserva</button>
		</div>
	);
};

export default Booking;
