import React, { useState, useEffect, useContext } from "react";
import "./register.css";
import { useHistory } from "react-router-dom";
import { Context } from "../../store/appContext";
import Swal from "sweetalert2";
import { FormattedMessage, injectIntl } from "react-intl";
import PropTypes from "prop-types";

const Register = ({ intl }) => {
	const { store, actions } = useContext(Context);
	const history = useHistory();
	const [username, setUserName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const placeholderMail = intl.formatMessage({ id: "login.email" });
	const placeholderPass = intl.formatMessage({ id: "login.password" });
	const placeholderUsername = intl.formatMessage({ id: "username" });
	const placeholderPassAgain = intl.formatMessage({ id: "password.repeat" });

	function savePersonalData() {
		history.push("/login");
	}

	async function signUp(event) {
		event.preventDefault();
		if (password !== confirmPassword) {
			Swal.fire({
				title: "Las contraseñas no coinciden",
				icon: "warning",
				confirmButtonText: "Ok"
			});
			return;
		}
		const url = process.env.BACKEND_URL + "/api/register";

		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				username: username,
				email: email,
				password: password
			})
		});
		const responseJson = await response.json();
		if (responseJson.access_token) {
			localStorage.setItem("token", responseJson.access_Token);
		}
		if (response.ok) {
			Swal.fire({
				title: "El registro se ha realizado correctamente!",
				icon: "success",
				confirmButtonText: "Ok"
			});
			return savePersonalData();
		}
		if (response.status === 500) {
			Swal.fire({
				title: "Ha ocurrido un problema con el registro, vuelva a intentarlo!",
				icon: "error",
				confirmButtonText: "Ok"
			});
			return;
		}
	}

	// function userNameRepeat() {
	// 	if (userName === userName) {
	// 		alert("El nombre de usuario ya existe, escoja otro!");
	// 	} else {
	// 		signUpAlert();
	// 	}
	// }

	// function signUpAlert(event) {
	// 	event.preventDefault();
	// 	if (signUp(event)) {
	// 		Swal.fire({
	// 			title: "El registro se ha realizado correctamente!",
	// 			icon: "success",
	// 			confirmButtonText: "Ok"
	// 		});
	// 		return savePersonalData();
	// 	} else {
	// 		Swal.fire({
	// 			title: "Ha ocurrido un problema con el registro, vuelva a intentarlo!",
	// 			icon: "error",
	// 			confirmButtonText: "Ok"
	// 		});
	// 		return;
	// 	}
	// }

	return (
		<div className="login">
			<div className="loginWrapper">
				<div className="loginLeft">
					<h3 className="loginLogo">
						<FormattedMessage id="login.welcome" defaultMessage="Bienvenid@!" />
					</h3>
					<span className="loginDesc">
						<FormattedMessage id="login.desc" defaultMessage="Conecta con peregrinos de todo el mundo" />
					</span>
				</div>
				<div className="loginRight">
					<form className="loginBox" onSubmit={signUp}>
						<input
							type="text"
							placeholder={placeholderUsername}
							className="loginInput"
							onChange={event => setUserName(event.target.value)}
							required
						/>

						<input
							type="email"
							placeholder={placeholderMail}
							className="loginInput"
							onChange={event => setEmail(event.target.value)}
							required
						/>
						<input
							type="password"
							placeholder={placeholderPass}
							className="loginInput"
							onChange={event => setPassword(event.target.value)}
							required
						/>
						<input
							type="password"
							placeholder={placeholderPassAgain}
							className="loginInput"
							onChange={event => setConfirmPassword(event.target.value)}
							required
						/>

						<input type="submit" value="Guardar" className="loginButton" />
					</form>
				</div>
			</div>
		</div>
	);
};

Register.propTypes = {
	intl: PropTypes.object
};
export default injectIntl(Register);
