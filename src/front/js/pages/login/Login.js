import React, { useContext, useState } from "react";
import { Context } from "../../store/appContext";
import { useHistory, Link } from "react-router-dom";
import "./login.css";
import Swal from "sweetalert2";
import MyProfile from "../myprofile";
import { FormattedMessage, injectIntl } from "react-intl";
import PropTypes from "prop-types";

const Login = ({ intl }) => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const history = useHistory();

	const placeholderMail = intl.formatMessage({ id: "login.email" });
	const placeholderPass = intl.formatMessage({ id: "login.password" });

	// console.log("This is your token", store.token);
	const handleClick = () => {
		actions.login(email, password).then(() => {
			if (store.token && store.token != "" && store.token != undefined) {
				history.push("/myprofile");
			} else {
				Swal.fire({
					title: "Usuario no identificado",
					text: "Debe ingresar datos válidos",
					icon: "warning",
					confirmButtonText: "Ok"
				});
			}
		});
	};
	const forgotPassword = () => {
		Swal.fire({
			title: "Revisa tu email",
			icon: "info",
			confirmButtonText: "Ok"
		});
	};

	return (
		<div className="text-center mt-5">
			{store.token && store.token != "" && store.token != undefined ? (
				//"You are logged in with this token" + store.token

				<MyProfile />
			) : (
				// "You are logged in with this token" + store.token
				<div className="login">
					<div className="loginWrapper">
						<div className="loginLeft">
							<h3 className="loginLogo">
								<FormattedMessage id="login.welcome" defaultMessage="Bienvenid@!" />
							</h3>
							<span className="loginDesc m-1">
								<FormattedMessage
									id="login.desc"
									defaultMessage="Conecta con peregrinos de todo el mundo"
								/>
							</span>
						</div>

						<div className="loginRight">
							<div className="loginBox">
								<input
									type="email"
									placeholder={placeholderMail}
									value={email}
									className="form-control"
									id="exampleInputEmail1"
									aria-describedby="emailHelp"
									onChange={e => {
										setEmail(e.target.value);
									}}
								/>
								<input
									type="password"
									placeholder={placeholderPass}
									value={password}
									className="form-control"
									id="exampleInputPassword1"
									onChange={e => {
										setPassword(e.target.value);
									}}
								/>
								<button type="submit" className="loginButton" onClick={handleClick}>
									<FormattedMessage id="login.login" defaultMessage="Acceder" />
								</button>
								<span className="loginForgot" onClick={forgotPassword}>
									<FormattedMessage id="login.forgot" defaultMessage="¿Olvidaste la contraseña?" />
								</span>
								<Link to="/register">
									<button className="loginRegisterButton">
										<FormattedMessage id="login.register" defaultMessage="Crear una cuenta" />
									</button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

Login.propTypes = {
	intl: PropTypes.object
};
export default injectIntl(Login);
