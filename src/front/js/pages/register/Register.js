import React, { useState, useEffect, useContext } from "react";
import "./register.css";
import { useHistory } from "react-router-dom";
import { Context } from "../../store/appContext";

const Register = () => {
	const { store, actions } = useContext(Context);
	const history = useHistory();
	// const [name, setName] = useState("");
	// const [surname, setSurName] = useState("");
	const [username, setUserName] = useState("");
	// const [age, setAge] = useState("");
	// const [country, setCountry] = useState("");
	// const [city, setCity] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	function savePersonalData() {
		history.push("/login");
	}

	async function signUp(event) {
		event.preventDefault();
		if (password !== confirmPassword) {
			alert("Las contraseñas no coinciden");
			return;
		}
		const url = process.env.BACKEND_URL + "/api/register";
		//const url = "https://3001-amaranth-cricket-uzm7r1o0.ws-eu18.gitpod.io/api/register";
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				// name: name,
				// surname: surname,
				username: username,
				// age: age,
				// country: country,
				// city: city,
				email: email,
				password: password
			})
		});
		const responseJson = await response.json();
		if (responseJson.access_token) {
			localStorage.setItem("accessToken", responseJson.accessToken);
		}
	}

	// function userNameRepeat() {
	// 	if (userName === userName) {
	// 		alert("El nombre de usuario ya existe, escoja otro!");
	// 	} else {
	// 		signUpAlert();
	// 	}
	// }

	function signUpAlert(event) {
		event.preventDefault();
		signUp(event);
		if (signUp) {
			alert("El registro se ha realizado correctamente!");
			return savePersonalData();
		} else {
			alert("Ha ocurrido un problema con el registro, vuelva a intentarlo!");
			return;
		}
	}

	return (
		<div className="login">
			<div className="loginWrapper">
				<div className="loginLeft">
					<h3 className="loginLogo">Bienvenido!</h3>
					<span className="loginDesc">Conecta con peregrinos de todo el mundo.</span>
				</div>
				<div className="loginRight">
					<form className="loginBox" onSubmit={signUpAlert}>
						{/* <form className="loginBox" onSubmit={(signUp, userNameRepeat)}>
						{/* <input
							type="text"
							placeholder="Name"
							className="loginInput"
							onChange={event => setName(event.target.value)}
						/>
						<input
							type="text"
							placeholder="Surname"
							className="loginInput"
							onChange={event => setSurName(event.target.value)}
						/> */}
						<input
							type="text"
							placeholder="Username"
							className="loginInput"
							onChange={event => setUserName(event.target.value)}
							required
						/>
						{/* <input
							type="number"
							placeholder="Age"
							className="loginInput"
							onChange={event => setAge(event.target.value)}
						/>
						<input
							type="text"
							placeholder="Country"
							className="loginInput"
							onChange={event => setCountry(event.target.value)}
						/>
						<input
							type="text"
							placeholder="City"
							className="loginInput"
							onChange={event => setCity(event.target.value)}
						/> */}
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
						<input type="submit" value="save" className="loginButton" />

						{/* <input //quitar este boton y que save redirija a /login
							type="button"
							value="Log into Account"
							className="loginRegisterButton"
							onClick={savePersonalData}
						/> */}
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;
