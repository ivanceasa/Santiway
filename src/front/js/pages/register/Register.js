import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import "./register.css";

export default function Register() {
	const history = useHistory();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	async function signUp(event) {
		event.preventDefault();
		if (password !== confirmPassword) {
			alert("Las contraseñas no coinciden");
			return;
		}
		const url = "";
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		});
		const responseJson = await response.json();
		if (responseJson.accessToken) {
			localStorage.setItem("accessToken", responseJson.accessToken);
		}
	}

	function savePersonalData() {
		history.push("/login");
	}

	return (
		<div className="login">
			<div className="loginWrapper">
				<div className="loginLeft">
					<h3 className="loginLogo">Bienvenido!</h3>
					<span className="loginDesc">Conecta con peregrinos de todo el mundo.</span>
				</div>
				<div className="loginRight">
					<form className="loginBox" onSubmit={signUp}>
						<input type="text" placeholder="Name" className="loginInput" />
						<input type="text" placeholder="Surname" className="loginInput" />
						<input type="number" placeholder="age" className="loginInput" />
						<input
							type="email"
							placeholder="Email"
							className="loginInput"
							onChange={event => setEmail(event.target.value)}
							required
						/>
						<input
							type="password"
							placeholder="Password"
							className="loginInput"
							onChange={event => setPassword(event.target.value)}
							required
						/>
						<input
							type="password"
							placeholder="Password Again"
							className="loginInput"
							onChange={event => setConfirmPassword(event.target.value)}
							required
						/>
						<input className="loginButton" type="submit" value="save" onSubmit={savePersonalData} />
					</form>
				</div>
			</div>
		</div>
	);
}
