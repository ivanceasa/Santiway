import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

const Booking = () => {
	const { store, actions } = useContext(Context);
	const { detailsId } = useParams();

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
				//id_hotel: item.id
			})
		});
	}

	return (
		<>
			<div className=" text-center mt-5">
				<input type="date" onChange={setDate} className="p-1 m-3" />
				<Link to="/confirmation">
					<button onClick={createBooking} className="btn btn-warning">
						Realizar reserva
					</button>
				</Link>
			</div>

			<div className="text-center m-4">
				{store.hostels.map((item, id) => {
					if (item.name === detailsId) {
						return (
							<div>
								<div key={id}>
									<div className="text-center m-4 p-4">
										<h1>{item.name}</h1>
										<h1>({item.city})</h1>
									</div>
									<div className>
										<img src={item.photo_hostel} />
									</div>
								</div>
							</div>
						);
					}
				})}
			</div>
		</>
	);
};

export default Booking;
